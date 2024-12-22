import { Socket } from "socket.io";
import UserRegistration from "./User/UserRegistration.js";

export const socketHandler = (socket: Socket) => {
  const userRegistration = UserRegistration.getInstance();
  userRegistration.registerSocket(socket);
}