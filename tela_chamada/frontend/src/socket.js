import { io } from "socket.io-client";

const URL = process.env.SOCKET_URL || "http://192.168.1.106:8080";
export const socket = io(URL, {
  autoConnect: false,
});
