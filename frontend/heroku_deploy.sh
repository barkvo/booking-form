#!/bin/bash

docker push registry.heroku.com/bf0522fe/web
heroku container:release web --app=bf0522fe