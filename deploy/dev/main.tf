terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  backend "s3" {
    bucket         = "synduce-dev-backend-state"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "SynduceDevBackendStateLock"
    encrypt        = true
    profile        = "synduce-dev"
  }

  required_version = ">= 0.14.9"
}
provider "aws" {
  profile = "synduce-dev"
  region  = "us-east-1"
}

# Backend configuration.
# S3 Bucket to store state remotely.
resource "aws_s3_bucket" "SynduceDevBackendState" {
  bucket = "synduce-dev-backend-state"
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
# DynamoDB table to lock state file to prevent concurrent writes.
resource "aws_dynamodb_table" "SynduceDevBackendStateLock" {
  name         = "SynduceDevBackendStateLock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}

# Call in common module
module "common" {
  source = "../common"
}

# TODO: Add another module for file system saving stuff, since the S3 bucket will need another unique name 😩