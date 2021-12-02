# 1. Topic for jobs that have been dispatched.
resource "aws_sns_topic" "QueuedJobs" {
  name = "QueuedJobs"
}
# Subscribe RunJob to above.
resource "aws_sns_topic_subscription" "RunJobSubscriptionToQueuedJobs" {
  topic_arn = aws_sns_topic.QueuedJobs.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.RunJob.arn
}

# 2. Topic for finished jobs.
resource "aws_sns_topic" "FinishedJobs" {
  name = "FinishedJobs"
}
# Subscribe UpdateJobStatus to above.
resource "aws_sns_topic_subscription" "UpdateJobStatusSubscriptionToFinishedJobs" {
  topic_arn = aws_sns_topic.FinishedJobs.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.UpdateJobStatus.arn
}