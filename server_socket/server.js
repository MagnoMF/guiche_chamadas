const express = require("express");
const socket = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.envPORT || 8080;
const httpServer = http.createServer(app);
const io = socket(httpServer, {
  path: "/socket.io",
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
  },
});

io.on("connection", (client) => {
  console.log(client.id);
});

io.on("disconnect", (client) => {
  console.log(client.id);
});

// Variaveis de controle requisições
const reqChamadas = [];
let senha = 0;
let multiplicadorTimeout = 0;
let timeoutClear;

function adicionarNumeroSenha() {
  if (senha > 98) {
    senha = 1;
    return;
  }
  senha++;
}

function clearMultiplicadorTimeout() {
  clearTimeout(timeoutClear);
  timeoutClear = setTimeout(() => {
    multiplicadorTimeout = 0;
  }, 2000);
}

function handleChamadas() {
  reqChamadas.forEach((chamada) => {
    reqChamadas.pop();
    setTimeout(() => {
      clearMultiplicadorTimeout();
      adicionarNumeroSenha();
      io.emit("chamarProximo", { chamada, senha });
      io.emit("senhaGuiche", { senha });
    }, 5000 * multiplicadorTimeout);
    multiplicadorTimeout++;
  });
}

function handlePularSenha(pularSenha) {
  reqChamadas.forEach((chamada) => {
    reqChamadas.pop();
    setTimeout(() => {
      clearMultiplicadorTimeout();
      senha = pularSenha
      io.emit("chamarProximo", { chamada, senha });
      io.emit("senhaGuiche", { senha });
    }, 5000 * multiplicadorTimeout);
    multiplicadorTimeout++;
  });
}

app.post("/chamarProximo", (req, res) => {
  try {
    const requisicao = req.query;
    if (!requisicao.guiche && !requisicao.action)
      return res.status(500).json({
        message: "Número de guiche ou action não foram enviados",
        status: 500,
      });

    reqChamadas.unshift(requisicao);
    handleChamadas();
    res.status(200).json({ message: `Chamando proximo...`, status: 200 });
  } catch (err) {
    res.status(500).json({ message: `${err}`, status: 500 });
  }
});

app.post("/pularSenha", (req, res) => {
  try {
    const requisicao = req.query;
    console.log(requisicao);
    if (!requisicao.guiche && !requisicao.action && !requisicao.senha)
      return res.status(500).json({
        message: "Número de guiche ou action não foram enviados",
        status: 500,
      });

    reqChamadas.unshift(requisicao);
    handlePularSenha(requisicao.senha);
    res.status(200).json({ message: `Pulando senha...`, status: 200 });
  } catch (err) {
    res.status(500).json({ message: `${err}`, status: 500 });
  }
});

httpServer.listen(PORT, () => {
  console.log(`Server iniciado em http://localhost:${PORT}`);
});
