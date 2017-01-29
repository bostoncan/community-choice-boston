# API Gateway Invoke Lambda Role

resource "aws_iam_role" "api_gateway_invoke_lambda" {
    name = "${var.resource_prefix}-api-gateway-invoke-lambda"
    assume_role_policy = "${file("./manifests/templates/assume-role-api-gateway.json")}"
}

resource "aws_iam_role_policy" "api_gateway_invoke_lambda" {
    name = "${var.resource_prefix}-api-gateway-invoke-lambda-policy"
    role = "${aws_iam_role.api_gateway_invoke_lambda.id}"
    policy = "${file("./manifests/templates/api-gateway-invoke-lambda-policy.json")}"
}


# Lambda Execution Role

resource "aws_iam_role" "lambda_execution" {
    name = "${var.resource_prefix}-lambda-execution"
    assume_role_policy = "${file("./manifests/templates/assume-role-lambda.json")}"
}

resource "aws_iam_role_policy" "lambda_execution_policy" {
    name = "${var.resource_prefix}-lambda-execution-policy"
    role = "${aws_iam_role.lambda_execution.id}"
    policy = "${file("./manifests/templates/lambda-execution-policy.json")}"
}
