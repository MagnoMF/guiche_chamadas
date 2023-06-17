FROM node:14
WORKDIR /guiche_chamadas
COPY . .
RUN cd server_socket/ & npm install expect
ENTRYPOINT cd server_socket/ node server.js


