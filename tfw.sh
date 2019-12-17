#!/bin/sh
# This script is run within the deploy docker container
set -e

ACTION=$1
STATE_BUCKET=bcan-terraform-state
AWS_DEFAULT_REGION=us-east-1
DEPLOYMENT_ENV=prd

cd manifests

# Hook up state object storage to S3
terraform init \
    -backend=true \
    -backend-config="region=$AWS_DEFAULT_REGION" \
    -backend-config="bucket=$STATE_BUCKET"

terraform workspace new $DEPLOYMENT_ENV || true
terraform workspace select $DEPLOYMENT_ENV

terraform validate

# Apply the terraform manifests
terraform apply -auto-approve -input=false
