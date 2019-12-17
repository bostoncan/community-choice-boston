#!/bin/bash
# This script is run directly on the host
set -e

# Perform the builds
if [ -z "$SKIP_BUILD" ]; then
    rm -rf api/build
    docker-compose run api npm run package
    docker-compose run webpack webpack
fi

# Run the deployment
docker run -ti \
    --env-file .env \
    --entrypoint /bin/sh \
    -w /app \
    -v "`pwd`:/app" \
    hashicorp/terraform:0.12.2 tfw.sh
