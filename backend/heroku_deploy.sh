#!/bin/bash

docker buildx build --platform linux/amd64 -t registry.heroku.com/bf0522/web -f ./docker/Dockerfile .
docker push registry.heroku.com/bf0522/web
heroku container:release web --app=bf0522