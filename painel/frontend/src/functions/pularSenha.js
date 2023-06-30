import axios from "axios";

async function pularSenha({numGuiche, senha}) {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SOCKET_IP}/pularSenha?guiche=${numGuiche}&action=pular&senha=${senha}`
    );
    console.log(data, "<<");
  } catch (err) {
    console.log(err, "<<");
  }
}

export default pularSenha;
