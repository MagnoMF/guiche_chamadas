import axios from "axios";

async function chamarProximo(numGuiche) {
  try {
    const { data } = await axios.post(
      `http://192.168.1.106:8080/chamarProximo?guiche=${numGuiche}&action=chamar`
    );
  } catch (err) {
    console.log(err, "<<");
  }
}

export default chamarProximo;
