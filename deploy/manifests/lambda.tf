# API endpoint handlers

resource "aws_lambda_function" "handler" {
    filename = "../api/build/build.zip"
    source_code_hash = "${base64sha256(file("../api/build/build.zip"))}"
    function_name = "${var.resource_prefix}-handler"
    description = "Backend logic controller"
    role = "${aws_iam_role.lambda_execution.arn}"
    runtime = "nodejs4.3"
    timeout = 60
    memory_size = 256
    handler = "handler.handle"
    environment {
        variables {
            NODE_ENV = "production"
        }
    }
}
