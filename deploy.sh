#!/bin/bash
# This script is run directly on the host
set -e

# Perform the builds
if [ -z "$SKIP_BUILD" ]; then
    docker-compose run api gulp archive
    docker-compose run webpack webpack
fi

# Build the deploy env to contain the latest build artifacts
docker build -t cce-deploy:latest --file ./deploy/Dockerfile .

# Run the deployment
docker run -ti \
    -v "$HOME/.aws:/root/.aws" \
    cce-deploy:latest \
    sh ./deploy/run.sh apply
