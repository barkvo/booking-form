#!/bin/bash

docker buildx build --platform linux/amd64 -t registry.heroku.com/bf0522fe/web -f ./docker/Dockerfile .