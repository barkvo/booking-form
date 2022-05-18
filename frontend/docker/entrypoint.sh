#!/bin/bash
BACKUP_DIR="/usr/share/nginx/html_backup"
TARGET_DIR="/usr/share/nginx/html"
if [ -d "$BACKUP_DIR" ]; then
  rm -rf $TARGET_DIR && cp -r $BACKUP_DIR $TARGET_DIR
else
  cp -r $TARGET_DIR $BACKUP_DIR
fi
if [ ! -z "$CONFIG_PATH" ]; then
  EXTERNAL_CONFIG_VALUE="$(printf "%q" $(cat $CONFIG_PATH))"; export EXTERNAL_CONFIG_VALUE
fi
find $TARGET_DIR -name "main-*.js" -maxdepth 1 -type f -exec sh -c "envsubst '\${EXTERNAL_CONFIG_VALUE},\${EXTERNAL_ENVIRONMENT_VALUE}' < {} > $(basename {})temp && mv $(basename {})temp {}" {} \;

envsubst '${API_HOST} ${API_PORT}' < /etc/nginx/conf.d/server.conf.template > /etc/nginx/conf.d/server.conf

nginx -g 'daemon off;'
