import makeSocketCommand from "./makeSocketCommand.js"

export const wsServer = makeSocketCommand(
  "wsServer",
  "LOG_ME",
  "CONNECTION_CONFIRMED",
  "SERVER_STARTED",
  "CHAT_MESSAGE",
  "NEW_GAME_CREATED"
);

export const wsClient = makeSocketCommand(
  "wsClient",
  "LOG_ME",
  "CONNECTING",
  "CONNECTED",
  "REGISTER_PLAYER",
  "CHAT_MESSAGE",
  "CREATE_NEW_GAME",
);