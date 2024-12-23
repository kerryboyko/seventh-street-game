import { Server, Socket } from "socket.io";
import UserRegistration from "./Services/UserRegistration.js";
import { wsClient } from "@repo/websockets/commands";
import { syncCodeGenerator } from "./Services/syncCodeGenerator.js";
import GameRegistration from "./Services/GameRegistration.js";

const userRegistration = UserRegistration.getInstance();
const gameRegistration = GameRegistration.getInstance();

export const socketHandler = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    userRegistration.registerSocket(socket);
  
    socket.on(wsClient.REGISTER_USERNAME, (name: string) => {
      userRegistration.registerName(socket, name);
    })

    socket.on(wsClient.CREATE_NEW_GAME, () => {
      const code = syncCodeGenerator();
      socket.join(code);
      
    })
  })

};
