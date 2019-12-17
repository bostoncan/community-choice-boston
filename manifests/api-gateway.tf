data "template_file" "swagger" {
    template = "${file("./templates/swagger.yml")}"
    vars = {
        domain = var.domain_fqdn
        lambda_arn = aws_lambda_function.handler.arn
        iam_invoke_arn = aws_iam_role.api_gateway_invoke_lambda.arn
    }
}

resource "aws_api_gateway_rest_api" "api" {
    name = "${var.resource_prefix}-api"
    description = ""
    lifecycle {
        ignore_changes = ["description", "name"]
    }
    body = data.template_file.swagger.rendered
}

resource "aws_api_gateway_deployment" "api_v1" {
    stage_name = "api_v1"
    rest_api_id = "${aws_api_gateway_rest_api.api.id}"

    # Use the SHA256 of the rendered swagger to auto-generate new deployments
    description = "${sha256(data.template_file.swagger.rendered)}"

    variables = {
        sha = "${sha256(data.template_file.swagger.rendered)}"
    }
}
