import { React, useEffect, useState } from "react";
import { socket } from "../socket";

export default function PainelChamada() {
  const [arrChamadas, setArrChamadas] = useState([]);
  const synth = window.speechSynthesis;
  function handleChamada(chamada) {
    setArrChamadas((prevState) => {
      return [...prevState.slice(-3), chamada];
    });
  }

  useEffect(() => {
    socket.connect();
    socket.on("chamarProximo", (chamada) => {
      handleChamada(chamada);

      const toSpeak = new SpeechSynthesisUtterance(
        `Senha ${chamada.senha}, compareça ao guichê ${chamada.chamada.guiche}`
      );
      synth.speak(toSpeak);
    });
  }, []);

  return (
    <>
      <audio src=""></audio>
      <h1>{JSON.stringify(arrChamadas.slice(-1))}</h1>

      <p>{JSON.stringify(arrChamadas)}</p>
    </>
  );
}
