terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  backend "s3" {
    bucket         = "synduce-backend-state"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "SynduceBackendStateLock"
    encrypt        = true
  }

  required_version = ">= 0.14.9"
}
provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

# Backend configuration.
# 1. S3 Bucket to store state remotely.
resource "aws_s3_bucket" "SynduceBackendState" {
  bucket = "synduce-backend-state"
  # Enable versioning so we can see the full revision history of state files.
  versioning {
    enabled = true
  }
  # Enable server-side encryption by default.
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}
# 2. DynamoDB table to lock state file to prevent concurrent writes.
resource "aws_dynamodb_table" "SynduceBackendStateLock" {
  name         = "SynduceBackendStateLock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}