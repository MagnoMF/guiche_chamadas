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

app.get("/testando2", (req, res) => {
  console.log("Entrou na rota");
  socket.emit("ola", "eei", (response) => {
    console.log(response)
  });
  return res.json("Tudo ok");
});

httpServer.listen(PORT, () => {
  console.log(`Server-client iniciado em http://localhost:${PORT}`);
});
