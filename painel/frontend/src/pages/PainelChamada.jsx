import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import { Center, Grid, Text, Title } from "@mantine/core";

export default function PainelChamada() {
  const [arrChamadas, setArrChamadas] = useState([]);
  const [chamando, setChamando] = useState({
    "chamada": { "guiche": "0", "action": "chamar" },
    "senha": 0,
  });
  const synth = window.speechSynthesis;
  function handleChamada(chamada) {
    setChamando(chamada);
    setArrChamadas((prevState) => {
      console.log(prevState);
      return [...prevState.slice(-9), chamada];
    });
  }

  useEffect(() => {
    socket.connect();
    socket.on("chamarProximo", (chamada) => {
      handleChamada(chamada);

      const toSpeak = new SpeechSynthesisUtterance(
        `Senha ${chamada.senha} GUICHÊ ${chamada.chamada.guiche}`,
      );
      synth.speak(toSpeak);
    });
  }, []);

  return (
    <React.Fragment>
      <Grid
        style={{
          padding: ".5em",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          borderRadius: ".5em",
          margin: "1.5em",
          backgroundColor: "#f8f7ff",
          height: "3rem",
        }}
        grow
      >
        <Title
          style={{ margin: "auto" }}
        >
          Geral
        </Title>
      </Grid>
      {/*----Head------*/}
      <Grid
        style={{
          height: "50%",
          margin: "1.5em",
        }}
        grow
      >
        <Grid.Col
          span={4}
        >
          <Grid
            style={{
              height: "15rem",
              padding: ".5rem",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "100%",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                borderRadius: ".5em",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                backgroundColor: "#f8f7ff",
              }}
            >
              <div>
                <Title style={{ fontSize: "3rem", fontWeigth: "bold" }}>
                  Senha
                </Title>
                <Title
                  style={{
                    textAlign: "center",
                    fontSize: "5rem",
                    fontWeigth: "bold",
                  }}
                >
                  {`0${chamando.senha}`.slice(-2)}
                </Title>
              </div>
            </div>
          </Grid>
          <Grid
            style={{
              height: "15rem",
              padding: ".5rem",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "100%",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                borderRadius: ".5em",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                backgroundColor: "#f8f7ff",
              }}
            >
              <div>
                <Title style={{ fontSize: "3rem", fontWeigth: "bold" }}>
                  Guiche
                </Title>
                <Title
                  style={{
                    textAlign: "center",
                    fontSize: "5rem",
                    fontWeigth: "bold",
                  }}
                >
                  {`0${chamando.chamada.guiche}`.slice(-2)}
                </Title>
              </div>
            </div>
          </Grid>
        </Grid.Col>
        {/*---------Lista Chamadas---------*/}
        <Grid.Col
          style={{
            padding: ".5rem",
            boxSizing: "border-box",
          }}
          span={4}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              borderRadius: ".5em",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              backgroundColor: "#f8f7ff",
              textAlign: "center",
            }}
          >
            <Title style={{ fontSize: "3rem", fontWeigth: "bold" }}>
              Guiche
            </Title>
            <div>
              {arrChamadas.map((chamadaAnterior, keyMap) => {
                return (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: "1.5em",
                      fontWeigth: "bold",
                    }}
                  >
                    Guiche: {chamadaAnterior.chamada.guiche} - Senha:{" "}
                    {chamadaAnterior.senha}
                  </Text>
                );
              }).reverse()}
            </div>
          </div>
        </Grid.Col>
        {/*---------Lista Chamadas---------*/}
      </Grid>
      {/*----Footer------*/}
      <Grid
        style={{
          padding: ".5em",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          borderRadius: ".5em",
          margin: "1.5em",
          backgroundColor: "#f8f7ff",
          height: "3rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        grow
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: "1.5em",
            fontWeigth: "bold",
          }}
        >
          - Tudo posso naquele que me fortalece
        </Text>
      </Grid>
    </React.Fragment>
  );
}
