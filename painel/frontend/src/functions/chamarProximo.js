import axios from "axios";

async function chamarProximo(numGuiche) {
  try {
    const { data } = await axios.post(
      `http://192.168.1.106:${process.env.REACT_APP_PORT_SOCKET}/chamarProximo?guiche=${numGuiche}&action=chamar`
    );
  } catch (err) {
    console.log(err, "<<");
  }
}

export default chamarProximo;
