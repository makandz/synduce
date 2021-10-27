# 1. Database to hold job statuses and the users who dispatched them, if any.
resource "aws_dynamodb_table" "JobStatuses" {
  name         = "JobStatuses"
  hash_key     = "jobID"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "jobID"
    type = "S"
  }
}