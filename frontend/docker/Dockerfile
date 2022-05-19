FROM node:14-alpine AS base

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install && npm run build

FROM nginx AS release

COPY --from=base /app/dist/map-challenge /usr/share/nginx/html
COPY --from=base /app/docker/entrypoint.sh /usr/share/nginx/entrypoint.sh
RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/server.conf.template /etc/nginx/conf.d/server.conf.template

CMD bash -C '/usr/share/nginx/entrypoint.sh';'bash'