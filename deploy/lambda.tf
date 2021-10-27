# Dummy payload for all Lambdas. Actual code will be deployed via CI/CD.
data "archive_file" "dummy" {
  type        = "zip"
  output_path = "dummy.zip"
  source {
    content  = "hello"
    filename = "dummy.txt"
  }
}


# 1. Lambda to accept incoming jobs from API Gateway.
resource "aws_lambda_function" "DispatchJob" {
  function_name = "DispatchJob"
  role          = aws_iam_role.RoleForLambdaDispatchJob.arn
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  filename      = "dummy.zip"
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
  inline_policy {
    name = "WriteToDynamoDBTableJobStatuses"
    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Action" : [
            "dynamodb:BatchWriteItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:PartiQLInsert"
          ],
          "Effect" : "Allow",
          "Resource" : aws_dynamodb_table.JobStatuses.arn
        }
      ]
    })
  }
}
# Resource based permission to allow trigger from API Gateway.
resource "aws_lambda_permission" "AllowDispatchJobExecutionFromAPIGateway" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.DispatchJob.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.SynduceHTTPApi.execution_arn}/*/*/dispatchjob"
}

# 2. Lambda for running Synduce. Backed by Docker container hosted on ECR.
resource "aws_lambda_function" "RunJob" {
  function_name = "RunJob"
  role          = aws_iam_role.RoleForLambdaRunJob.arn
  package_type  = "Image"
  image_uri     = format("%s:latest", aws_ecr_repository.runjob_ecr_repo.repository_url)
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
# ECR repo for above.
resource "aws_ecr_repository" "runjob_ecr_repo" {
  name = "runjob_ecr_repo"
}

# 3. Lambda to take finished jobs and update database.
resource "aws_lambda_function" "UpdateJobStatus" {
  function_name = "UpdateJobStatus"
  role          = aws_iam_role.RoleForLambdaUpdateJobStatus.arn
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  filename      = "dummy.zip"
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
  inline_policy {
    name = "UpdateDynamoDBTableJobStatuses"
    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Action" : [
            "dynamodb:Query",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:PartiQLUpdate"
          ],
          "Effect" : "Allow",
          "Resource" : aws_dynamodb_table.JobStatuses.arn
        }
      ]
    })
  }
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

# 4. Lambda to query database for finished job as proxy for frontend.
resource "aws_lambda_function" "QueryJob" {
  function_name = "QueryJob"
  role          = aws_iam_role.RoleForLambdaQueryJob.arn
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  filename      = "dummy.zip"
}
# Role for the above.
resource "aws_iam_role" "RoleForLambdaQueryJob" {
  name = "RoleForLambdaQueryJob"
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
    name = "QueryDynamoDBTableJobStatuses"
    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Action" : [
            "dynamodb:Query"
          ],
          "Effect" : "Allow",
          "Resource" : aws_dynamodb_table.JobStatuses.arn
        }
      ]
    })
  }
}
# Resource based permission to allow trigger from API Gateway.
resource "aws_lambda_permission" "AllowQueryJobExecutionFromAPIGateway" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.QueryJob.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.SynduceHTTPApi.execution_arn}/*/*/queryjob"
}