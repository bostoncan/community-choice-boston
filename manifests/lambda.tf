# API endpoint handlers

resource "aws_lambda_function" "handler" {
    filename = "../api/build/build.zip"
    source_code_hash = "${filesha256("../api/build/build.zip")}"
    function_name = "${var.resource_prefix}-handler"
    description = "Backend logic controller"
    role = "${aws_iam_role.lambda_execution.arn}"
    runtime = "nodejs12.x"
    timeout = 60
    memory_size = 256
    handler = "src/handler.handle"
    environment {
        variables = {
            NODE_ENV = "production"
            EVENTBRITE_TOKEN = var.eventbrite_token
            EVENTBRITE_ORGANIZER = var.eventbrite_organizer
            ACTION_NETWORK_TOKEN = var.action_network_token
        }
    }
}
