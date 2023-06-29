import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SOCKET_PORT;
export const socket = io(URL, {
  autoConnect: false,
});
