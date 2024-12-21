import makeSocketCommand from "./makeSocketCommand.js"

export const wsServer = makeSocketCommand(
  "wsServer",
  "CONNECTION_CONFIRMED",
  "SERVER_STARTED",
  "CHAT_MESSAGE"
);

export const wsClient = makeSocketCommand(
  "wsClient",
  "CONNECTING",
  "CONNECTED",
  "REGISTER_PLAYER",
  "CHAT_MESSAGE"
);