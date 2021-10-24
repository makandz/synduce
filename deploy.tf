terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}
provider "aws" {
  profile = "default"
  region  = "us-east-1"
}


# Lambda which accepts incoming jobs from API Gateway and publishes them to QueuedJobs.
resource "aws_lambda_function" "DispatchJob" {
  function_name = "DispatchJob"
  role          = aws_iam_role.RoleForLambdaDispatchJob.arn
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  filename      = "build/DispatchJobPayload.zip"
  timeout       = 29
  environment {
    variables = {
      QueuedJobsARN = aws_sns_topic.QueuedJobs.arn
    }
  }
}
# Role for the above.
resource "aws_iam_role" "RoleForLambdaDispatchJob" {
  name = "RoleForLambdaDispatchJob"
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : "sts:AssumeRole",
        "Principal" : {
          "Service" : "lambda.amazonaws.com"
        },
        "Effect" : "Allow",
        "Sid" : ""
      }
    ]
  })
  managed_policy_arns = ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"]
  inline_policy {
    name = "PublishToSNSTopicQueuedJobs"
    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Action" : "sns:Publish",
          "Effect" : "Allow",
          "Resource" : aws_sns_topic.QueuedJobs.arn
        }
      ]
    })
  }
}
# Paylod for the above.
data "archive_file" "DispatchJobPayload" {
  type             = "zip"
  source_dir      = "lambda/DispatchJob/payload"
  output_path      = "build/DispatchJobPayload.zip"
}

# Queue for jobs that have been dispatched.
resource "aws_sns_topic" "QueuedJobs" {
  name = "QueuedJobs"
}

# Lambda for running a long-running job. Synduce will eventually go here, with a container image instead of this.
resource "aws_lambda_function" "RunJob" {
  function_name = "RunJob"
  role          = aws_iam_role.RoleForLambdaRunJob.arn
  handler       = "app.handler"
  runtime       = "python3.9"
  filename      = "build/RunJobPayload.zip"
  memory_size   = 1024
  timeout       = 90
  environment {
    variables = {
      FinishedJobsARN = aws_sns_topic.FinishedJobs.arn
    }
  }
}
# Role for the above.
resource "aws_iam_role" "RoleForLambdaRunJob" {
  name = "RoleForLambdaRunJob"
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : "sts:AssumeRole",
        "Principal" : {
          "Service" : "lambda.amazonaws.com"
        },
        "Effect" : "Allow",
        "Sid" : ""
      }
    ]
  })
  managed_policy_arns = ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"]
  inline_policy {
    name = "PublishToSNSTopicFinishedJobs"
    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Action" : "sns:Publish",
          "Effect" : "Allow",
          "Resource" : aws_sns_topic.FinishedJobs.arn
        }
      ]
    })
  }
}
# Paylod for the above.
data "archive_file" "RunJobPayload" {
  type             = "zip"
  source_dir      = "lambda/RunJob/payload"
  output_path      = "build/RunJobPayload.zip"
}
# Subscription for above to topic.
resource "aws_sns_topic_subscription" "RunJobSubscriptionToQueuedJobs" {
  topic_arn = aws_sns_topic.QueuedJobs.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.RunJob.arn
}
# Resource-based policy for Lambda to allow subscription to invoke it
resource "aws_lambda_permission" "AllowExecutionFromSNSTopicQueuedJobs" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.RunJob.function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.QueuedJobs.arn
}

# Topic for finished jobs.
resource "aws_sns_topic" "FinishedJobs" {
  name = "FinishedJobs"
}

# Lambda to take finished jobs from above topic and update the database.
resource "aws_lambda_function" "UpdateJobStatus" {
  function_name = "UpdateJobStatus"
  role          = aws_iam_role.RoleForLambdaUpdateJobStatus.arn
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  filename      = "build/UpdateJobStatusPayload.zip"
}
# Role for the above.
resource "aws_iam_role" "RoleForLambdaUpdateJobStatus" {
  name = "RoleForLambdaUpdateJobStatus"
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : "sts:AssumeRole",
        "Principal" : {
          "Service" : "lambda.amazonaws.com"
        },
        "Effect" : "Allow",
        "Sid" : ""
      }
    ]
  })
  managed_policy_arns = ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"]
}
# Paylod for the above.
data "archive_file" "UpdateJobStatusPayload" {
  type             = "zip"
  source_dir      = "lambda/UpdateJobStatus/payload"
  output_path      = "build/UpdateJobStatusPayload.zip"
}
# Subscription for above to topic.
resource "aws_sns_topic_subscription" "UpdateJobStatusSubscriptionToFinishedJobs" {
  topic_arn = aws_sns_topic.FinishedJobs.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.UpdateJobStatus.arn
}
# Resource-based policy for Lambda to allow subscription to invoke it
resource "aws_lambda_permission" "AllowExecutionFromSNSTopicFinishedJobs" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.UpdateJobStatus.function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.FinishedJobs.arn
}