import { React, useState } from "react";
import chamarProximo from "../functions/chamarProximo";
import { Grid, Select, Avatar, Button, Title, Text } from "@mantine/core";
import logotipo from "../imagens/logotipo.jpg";

export default function TelaChamada() {
  const [numeroGuiche, setNumeroGuiche] = useState(0);

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
          <Button style={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}>
            Travar Seleção
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
            <Title style={{ fontSize: "3em" }}> Senha Atual</Title>
          </div>
          <div
            style={{
              height: "33%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Title style={{ fontSize: "5em" }}>{35}</Title>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "33%",
            }}
          >
            <Button
              style={{
                height: "7em",
                width: "80%",
                borderRadius: ".8em",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              }}
            >
              Chamar Próximo
            </Button>
          </div>
        </Grid.Col>
        <Grid.Col span={"auto"}></Grid.Col>
      </Grid>
    </>
  );
}
