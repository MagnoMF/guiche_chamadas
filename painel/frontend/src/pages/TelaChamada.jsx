import { React, useEffect, useState } from "react";
import chamarProximo from "../functions/chamarProximo";
import pularSenha from "../functions/pularSenha";
import { Avatar, Button, Grid, Select, Title } from "@mantine/core";
import { socket } from "../socket";

export default function TelaChamada() {
  const [numGuiche, setNumGuiche] = useState(null);
  const [numGuicheTravado, setNumGuicheTravado] = useState(false);
  const [chamando, setChamando] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState(0);

  useEffect(() => {
    socket.connect();
    socket.on("senhaGuiche", (numSenha) => {
      mudarSenhaAtual(numSenha.senha);
    });
  }, []);

  function mudarSenhaAtual(senha) {
    if (senha > 99) {
      setSenhaAtual(99);
      return;
    }
    if (senha < 1) {
      setSenhaAtual(1);
      return;
    }
    setSenhaAtual(senha);
  }

  function travarBotoes() {
    setChamando(true);
    setTimeout(() => {
      setChamando(false);
    }, 2000);
  }

  return (
    <>
      <Grid
        style={{
          padding: ".5em",
          backgroundColor: "#f8f7ff",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        }}
      >
        <Grid.Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          span={"content"}
        >
          <Avatar color="indigo" size="lg" radius="xl">
            M
          </Avatar>
        </Grid.Col>
        <Grid.Col
          style={{ maxWidth: "15rem", paddingLeft: "1.5em" }}
          span={"auto"}
        >
          <Select
            disabled={numGuicheTravado}
            onChange={setNumGuiche}
            label="Selecionar número do Guichê"
            placeholder="Número guiche"
            searchable
            nothingFound="Número guichê não econtrado"
            data={Object.keys(new Array(10).fill(null))}
          />
        </Grid.Col>
        <Grid.Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          span={"auto"}
        >
          <Button
            onClick={() => {
              setNumGuicheTravado((prevState) => {
                if (numGuiche) {
                  return !prevState;
                }
              });
            }}
            style={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}
          >
            {numGuicheTravado ? "Destravar Seleção" : "Travar Seleção"}
          </Button>
        </Grid.Col>
      </Grid>
      <Grid style={{ height: "5rem" }}>
        <Grid.Col span={"auto"}></Grid.Col>
      </Grid>
      <Grid style={{ height: "calc(100vh - 20rem)" }}>
        <Grid.Col span={"auto"}></Grid.Col>
        <Grid.Col
          style={{
            maxWidth: "70rem",
            borderRadius: ".5em",
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            backgroundColor: "white",
          }}
          span={10}
        >
          <div
            style={{
              height: "33%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Title style={{ fontSize: "3em" }}>Senha Atual</Title>
          </div>

          <div
            style={{
              height: "33%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button
              disabled={!numGuicheTravado || chamando}
              onClick={() => {
                mudarSenhaAtual(parseInt(senhaAtual) - 1);
              }}
              style={{
                borderRadius: "200em",
                height: "5em",
                width: "5em",
              }}
            >
              <h1>-</h1>
            </Button>
            <Title style={{ fontSize: "5em" }}>{senhaAtual}</Title>
            <Button
              disabled={!numGuicheTravado || chamando}
              onClick={() => {
                mudarSenhaAtual(parseInt(senhaAtual) + 1);
              }}
              style={{
                borderRadius: "200em",
                height: "5em",
                width: "5em",
              }}
            >
              +
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              height: "33%",
            }}
          >
            <Button
              disabled={!numGuicheTravado || chamando}
              onClick={() => {
                chamarProximo(numGuiche);
                travarBotoes();
              }}
              style={{
                height: "2em",
                width: "40%",
                borderRadius: ".2em",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                fontSize: "3em",
              }}
            >
              Chamar
            </Button>

            <Button
              disabled={!numGuicheTravado || chamando}
              onClick={() => {
                pularSenha({ numGuiche, senha: senhaAtual });
                travarBotoes();
              }}
              style={{
                height: "2em",
                width: "40%",
                borderRadius: ".2em",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                fontSize: "3em",
              }}
            >
              Pular..
            </Button>
          </div>
        </Grid.Col>
        <Grid.Col span={"auto"}></Grid.Col>
      </Grid>
    </>
  );
}
