import axios from "axios";

async function pularSenha({numGuiche, senha}) {
  try {
    const { data } = await axios.post(
      `http://192.168.1.106:8080/pularSenha?guiche=${numGuiche}&action=pular&senha=${senha}`
    );
    console.log(data, "<<");
  } catch (err) {
    console.log(err, "<<");
  }
}

export default pularSenha;
