'use strict';

const AWS = require('aws-sdk'),
      fs = require('fs'),
      _ = require('lodash'),
      yaml = require('js-yaml');

const region = 'us-east-1',
      apigateway = new AWS.APIGateway({region: region});

function errHandler(err) {
    if (err) {
        console.log(err, err.stack);
        process.exit(1);
    }
}

// Press the "deploy button" to roll the configurations out
function createDeployment(err) {
    errHandler(err);

    let params = {
        restApiId: process.env.API_ID,
        stageName: process.env.STAGE_ID,
        description: process.env.SWAGGER_SHA
    };

    apigateway.createDeployment(params, (err, data) => {
        errHandler(err);
        console.log(data);
    });
}

function deploySwagger() {
    try {
        // Collect data from process envs
        const p = {
            domain: process.env.DOMAIN,
            lambda_arn: process.env.LAMBDA_ARN,
            iam_invoke_arn: process.env.IAM_INVOKE_ARN
        };

        // Import swagger yaml, apply template variables, and parse to JSON
        const swagger = fs.readFileSync('./templates/swagger.yml'),
              jsonDoc = yaml.load(_.template(swagger)(p));

        // Set up API Gateway call
        let params = {
            body: JSON.stringify(jsonDoc),
            restApiId: process.env.API_ID,
            failOnWarnings: true,
            mode: 'overwrite'
        };

        // Push swagger to AWS
        apigateway.putRestApi(params, createDeployment);
    } catch (err) {
        console.log(err, err.stack);
        process.exit(1);
    }
}

// Deploy API via swagger upload putRestApi endpoint
deploySwagger();
