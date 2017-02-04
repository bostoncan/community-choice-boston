#!/bin/sh
# This script is run within the deploy docker container
set -e

ACTION=$1
STATE_BUCKET=bcan-terraform-state
AWS_DEFAULT_REGION=us-east-1
AWS_DEFAULT_PROFILE=bcan

terraform validate deploy/manifests

# Hook up state object storage to S3
terraform remote config \
    -backend=s3 \
    -backend-config="bucket=$STATE_BUCKET" \
    -backend-config="key=cce-boston/terraform.tfstate" \
    -backend-config="region=$AWS_DEFAULT_REGION" \
    -backend-config="profile=$AWS_DEFAULT_PROFILE"
terraform remote pull

# Call terraform action
terraform $ACTION deploy/manifests
