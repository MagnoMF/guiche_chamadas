const express = require("express");
const { io } = require("socket.io-client");
const http = require("http");

const app = express();
const PORT = process.envPORT || 9090;
const httpServer = http.createServer(app);
const URL = "http://localhost:8080";
const socket = io(URL, { autoConnect: false });

socket.connect();
socket.on("teste", (teste) => {
  console.log("Acho que entendi", teste);
});

httpServer.listen(PORT, () => {
  console.log(`Server iniciado em http://localhost:${PORT}`);
});
