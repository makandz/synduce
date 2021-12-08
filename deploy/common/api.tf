resource "aws_apigatewayv2_api" "SynduceHTTPApi" {
  name          = "SynduceHTTPApi"
  protocol_type = "HTTP"
  cors_configuration {
    allow_credentials = false
    allow_headers = [
      "*",
    ]
    allow_methods = [
      "POST",
    ]
    allow_origins = [
      "*",
    ]
    expose_headers = []
    max_age        = 0
  }
}

# Create prod stage and deployment to it.
resource "aws_apigatewayv2_deployment" "DeployToActive" {
  api_id      = aws_apigatewayv2_stage.active.api_id
  description = "Deployed at ${timestamp()}"

  lifecycle {
    create_before_destroy = true
  }
}
resource "aws_apigatewayv2_stage" "active" {
  api_id = aws_apigatewayv2_api.SynduceHTTPApi.id
  name   = "active"
}

# Create routes for /dispatchjob and /queryjob and /queryuserpastjobs
resource "aws_apigatewayv2_route" "dispatchjob" {
  api_id    = aws_apigatewayv2_api.SynduceHTTPApi.id
  route_key = "POST /dispatchjob"
  target    = "integrations/${aws_apigatewayv2_integration.DispatchJobIntegration.id}"
}
resource "aws_apigatewayv2_route" "queryjob" {
  api_id    = aws_apigatewayv2_api.SynduceHTTPApi.id
  route_key = "POST /queryjob"
  target    = "integrations/${aws_apigatewayv2_integration.QueryJobIntegration.id}"
}
resource "aws_apigatewayv2_route" "queryuserpastjobs" {
  api_id    = aws_apigatewayv2_api.SynduceHTTPApi.id
  route_key = "POST /queryuserpastjobs"
  target    = "integrations/${aws_apigatewayv2_integration.QueryUserPastJobsIntegration.id}"
}

# Integrations with Lambdas.
resource "aws_apigatewayv2_integration" "DispatchJobIntegration" {
  api_id             = aws_apigatewayv2_api.SynduceHTTPApi.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.DispatchJob.invoke_arn
}
resource "aws_apigatewayv2_integration" "QueryJobIntegration" {
  api_id             = aws_apigatewayv2_api.SynduceHTTPApi.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.QueryJob.invoke_arn
}
resource "aws_apigatewayv2_integration" "QueryUserPastJobsIntegration" {
  api_id             = aws_apigatewayv2_api.SynduceHTTPApi.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.QueryUserPastJobs.invoke_arn
}