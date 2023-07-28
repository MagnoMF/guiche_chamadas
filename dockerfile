FROM nginx:stable-alpine3.17-slim

ENV SOCKET_PORT=8100
ENV PAINEL_DIR=/var/www/painel-guiche/html
ENV REACT_APP_SOCKET_IP=http://localhost:$SOCKET_PORT

RUN apk add --update \
  bash \
  vim 

RUN mkdir -p $PAINEL_DIR
COPY /server_socket/ $SOCKET_DIR
COPY /configNginx/nginx.conf /etc/nginx/nginx.conf
COPY /painel/frontend/build/ /var/www/painel-guiche/html
