import axios from "axios";

async function pularSenha({numGuiche, senha}) {
  try {
    const { data } = await axios.post(
      `http://localhost:8080/pularSenha?guiche=${numGuiche}&action=pular&senha=${senha}`
    );
    console.log(data, "<<");
  } catch (err) {
    console.log(err, "<<");
  }
}

export default pularSenha;
