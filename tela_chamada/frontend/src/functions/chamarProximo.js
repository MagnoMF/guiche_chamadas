import axios from "axios";

async function chamarProximo() {
  try {
    const { data } = await axios.post(
      `http://localhost:8080/chamarProximo?guiche=1&action=chamar`
    );
    console.log(data, "<<");
  } catch (err) {
    console.log(err.response.data.message, "<<");
  }
}

export default chamarProximo;
