# 1. Topic for jobs that have been dispatched.
resource "aws_sns_topic" "QueuedJobs" {
  name = "QueuedJobs"
}

# 2. Topic for finished jobs.
resource "aws_sns_topic" "FinishedJobs" {
  name = "FinishedJobs"
}