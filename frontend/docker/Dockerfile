FROM node:14-alpine AS base

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install && npm run build

# FROM nginx AS release

# COPY --from=base /app/dist/map-challenge /usr/share/nginx/html
# COPY --from=base /app/docker/entrypoint.sh /usr/share/nginx/entrypoint.sh
# RUN rm /etc/nginx/conf.d/default.conf
# COPY ./docker/nginx/server.conf.template /etc/nginx/conf.d/server.conf.template

# CMD bash -C '/usr/share/nginx/entrypoint.sh';'bash'

FROM nginx:1.21.6 AS release

COPY ./docker/nginx/server.conf.template /etc/nginx/conf.d/server.conf.template
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=base /app/dist/map-challenge /usr/share/nginx/html

# ARG NGINX_PORT=$PORT
# ENV NGINX_PORT=${NGINX_PORT}

# CMD /bin/bash -c "envsubst '\$PORT ${PORT}' < /etc/nginx/conf.d/server.conf.template > /etc/nginx/conf.d/server.conf" && nginx -g 'daemon off;'

# ENV PORT=$PORT

# CMD /bin/bash -c "envsubst '${PORT}' < /etc/nginx/conf.d/server.conf.template > /etc/nginx/conf.d/server.conf" && nginx -g 'daemon off;'

# ENV SUBST_VARS='${NGINX_PORT}'

# CMD export NGINX_PORT=$PORT && /bin/bash -c "envsubst '$SUBST_VARS' < /etc/nginx/conf.d/server.conf.template > /etc/nginx/conf.d/server.conf" && nginx -g 'daemon off;'

# ENV SUBST_VARS='${PORT}'

# CMD echo 'test' && echo ${PORT} && echo $PORT && echo $SUBST_VARS && bin/bash -c "envsubst '$SUBST_VARS' < /etc/nginx/conf.d/server.conf.template > /etc/nginx/conf.d/server.conf" && nginx -g 'daemon off;'

CMD sh -c "envsubst \"`env | awk -F = '{printf \" \\\\$%s\", $1}'`\" < /etc/nginx/conf.d/server.conf.template > /etc/nginx/conf.d/server.conf && nginx -g 'daemon off;'"