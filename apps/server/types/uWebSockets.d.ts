import { WebSocket } from "uWebSockets.js";

declare module "uWebSockets.js" {
  interface UserData {
    id?: string;
    userData?: UserData;
    [key: string]: any; // define this more properly later. 
  }
  interface WebSocket {
    userData?: UserData;
  }
}
