import axios from "axios";

async function chamarProximo(numGuiche) {
  try {
    const { data } = await axios.post(
      `http://localhost:8080/chamarProximo?guiche=${numGuiche}&action=chamar`
    );
  } catch (err) {
    console.log(err, "<<");
  }
}

export default chamarProximo;
