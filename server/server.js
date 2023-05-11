const express = require("express");
const socket = require("socket.io");
const http = require("http");

const app = express();
const PORT = process.envPORT || 8080;
const httpServer = http.createServer(app);
const io = socket(httpServer, {
  path: "/socket.io",
  cors: {
    origin: "http://localhost:8080",
  },
});

const reqChamadas = [];

io.on("connection", (client) => {
  console.log(client.id);
});

io.on("disconnect", (client) => {
  console.log(client.id);
});
app.get("/teste", (req, res) => {
  io.emit("teste", 'seila');
});

httpServer.listen(PORT, () => {
  console.log(`Server iniciado em http://localhost:${PORT}`);
});
