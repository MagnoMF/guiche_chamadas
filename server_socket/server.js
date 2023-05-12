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
let multiplicadorTimeout = 0;
let timeoutClear;
let arrChamados = [];

function clearMultiplicadorTimeout() {
  clearTimeout(timeoutClear);
  console.log("reset time clear timout");
  timeoutClear = setTimeout(() => {
    multiplicadorTimeout = 0;
    console.log("timeouLimpo");
  }, 2000);
}
function loopArr() {
  reqChamadas.forEach((chamada) => {
    multiplicadorTimeout++;
    reqChamadas.pop();
    setTimeout(() => {
      clearMultiplicadorTimeout();
      console.log(multiplicadorTimeout);
      arrChamados.push(chamada);
      console.log(arrChamados);
    }, 1000 * (multiplicadorTimeout + 1));
  });
}

app.get("/chamarProximo", async (req, res) => {
  if (!req.query) {
    return res.json({ Erro: "Guiche ou action não enviado" });
  }
  const guiche = Math.floor(Math.random() * 999);
  const requisicao = { guiche: guiche, action: "chamar" };
  reqChamadas.unshift(requisicao);
  loopArr();
  return res.json(reqChamadas);
});

httpServer.listen(PORT, () => {
  console.log(`Server iniciado em http://localhost:${PORT}`);
});
