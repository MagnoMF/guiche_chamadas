FROM nginx:stable-alpine3.17-slim

ENV PAINEL_DIR=/var/www/painel-guiche/html
#ENV SOCKET_DIR=/app/server_socket

RUN apk add --update \
  bash \
  vim
#  nodejs \
#  npm
RUN mkdir -p /app \
  $SOCKET_DIR \
  /painel \
  $PAINEL_DIR
#RUN rm -rf $PAINEL_DIR/*
#RUN mkdir /etc/nginx/servers
#COPY /server_socket/* $SOCKET_DIR
RUN chmod -R $USER 755 $PAINEL_DIR
COPY /painel/* /painel
COPY nginx.conf /etc/nginx/nginx.conf
COPY /painel/frontend/build/* $PAINEL_DIR
#RUN cd /painel/frontend && npm install
  #&& npm run build \
  #&& cp build/* usr/share/nginx/html
#COPY servers/ /etc/nginx/servers

#ENV SOCKET_PORT=8100
#EXPOSE 8103
#RUN cd $SOCKET_DIR && npm install
#ENTRYPOINT cd $SOCKET_DIR && node server.js


#ENV SERVER_IP=192.168.1.106
#COPY /painel/frontend/build/* /usr/share/nginx/html
