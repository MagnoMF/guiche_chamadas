import axios from "axios";

async function chamarProximo(numGuiche) {
  console.log(process.env)
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SOCKET_IP}/chamarProximo?guiche=${numGuiche}&action=chamar`
    );
    console.log(data)
  } catch (err) {
    console.log(err, "<<");
  }
}

export default chamarProximo;
