# 1. Database to hold job statuses and the users who dispatched them, if any.
resource "aws_dynamodb_table" "JobInfo" {
  name         = "JobInfo"
  hash_key     = "userID"
  range_key    = "jobID"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "jobID"
    type = "S"
  }

  attribute {
    name = "userID"
    type = "S"
  }
}