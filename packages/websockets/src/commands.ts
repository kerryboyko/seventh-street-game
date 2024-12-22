import makeSocketCommand from "./makeSocketCommand.js"

export const wsServer = makeSocketCommand(
  "wsServer",
  "CONNECTION_CONFIRMED",
  "SERVER_STARTED",
  "CHAT_MESSAGE",
  "NEW_GAME_CREATED"
);

export const wsClient = makeSocketCommand(
  "wsClient",
  "CONNECTING",
  "CONNECTED",
  "REGISTER_PLAYER",
  "CHAT_MESSAGE",
  "CREATE_NEW_GAME",
);