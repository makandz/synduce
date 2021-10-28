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
resource "aws_apigatewayv2_deployment" "DeployToProd" {
  api_id = aws_apigatewayv2_stage.prod.api_id

  lifecycle {
    create_before_destroy = true
  }
}
resource "aws_apigatewayv2_stage" "prod" {
  api_id = aws_apigatewayv2_api.SynduceHTTPApi.id
  name   = "prod"
}

# Create routes for /dispatchjob and /queryjob
resource "aws_apigatewayv2_route" "dispatchjob" {
  api_id    = aws_apigatewayv2_api.SynduceHTTPApi.id
  route_key = "POST /dispatchjob"

  target = "integrations/${aws_apigatewayv2_integration.DispatchJobIntegration.id}"
}
resource "aws_apigatewayv2_route" "queryjob" {
  api_id    = aws_apigatewayv2_api.SynduceHTTPApi.id
  route_key = "POST /queryjob"

  target = "integrations/${aws_apigatewayv2_integration.QueryJobIntegration.id}"
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