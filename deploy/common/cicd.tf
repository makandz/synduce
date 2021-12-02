resource "aws_iam_role" "RoleForGithubActionsUploadToLambda" {
  name = "RoleForGithubActionsUploadToLambda"
  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
      "Effect": "Allow",
      "Principal": {
          "Service": "lambda.amazonaws.com",
          "AWS": "arn:aws:iam::225713176475:user/synduce-prod"
      },
      "Action": [
          "sts:AssumeRole",
          "sts:TagSession"
      ]
      }
  ]
  })
  managed_policy_arns = ["arn:aws:iam::aws:policy/AWSLambda_FullAccess"]
  inline_policy {
    name = "QueryDynamoDBTableJobStatuses"
    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Action" : [
            "dynamodb:Query",
            "dynamodb:PartiQLSelect"
          ],
          "Effect" : "Allow",
          "Resource" : aws_dynamodb_table.JobStatuses.arn
        }
      ]
    })
  }
}