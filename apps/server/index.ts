import * as uWS from "uWebSockets.js";
import type {WebSocket, UserData} from 'uWebSockets.js';
import { parseMessage } from "./utils/parseMessage.js";
import UserRegistration from "./UserRegistration.js";
import { processMessage } from "./processor/processMessage.js";

const port = 9001;
const userRegistration = UserRegistration.getInstance();

const app = uWS
  ./*SSL*/ App({
    key_file_name: "misc/key.pem",
    cert_file_name: "misc/cert.pem",
    passphrase: "1234",
  })
  .get("/*", (res, req) => {
    res.end("Hello World!");
  })
  .ws("/*", {
    open: (ws: WebSocket<UserData>) => {
      const id = userRegistration.registerSocket(ws);
      ws.send(`Hello from server! ${id}`);
    },
    message: (ws, message, isBinary) => {
      const msg = parseMessage(message);
      console.log("Message received:", msg);
      // ws.send("Echo: " + JSON.stringify(msg));
      processMessage(ws, msg);
    },
    close: (ws, code, message) => {
      console.log("A WebSocket closed");
    },
  })
  .listen(port, (token) => {
    if (token) {
      console.log("WebSocket server listening on port 9001");
    } else {
      console.log("Failed to start WebSocket server");
    }
  });
