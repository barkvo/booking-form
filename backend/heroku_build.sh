#!/bin/bash

docker buildx build --platform linux/amd64 -t registry.heroku.com/bf0522/web -f ./docker/Dockerfile .