import makeSocketCommand from "./makeSocketCommand.js";

const makeType = (
  prefix: string,
  ...values: string[]
): Record<string, string> => {
  const output: Record<string, string> = {};
  for (let value of values) [(output[value] = `${prefix}.${value}`)];
  return output;
};

const serverKeys = [
  "LOG_ME",
  "CONNECTION_CONFIRMED",
  "SERVER_STARTED",
  "CHAT_MESSAGE",
  "NEW_GAME_CREATED",
];

const clientKeys = [
  "LOG_ME",
  "CONNECTING",
  "CONNECTED",
  "REGISTER_PLAYER",
  "CHAT_MESSAGE",
  "CREATE_NEW_GAME",
  "JOIN_GAME",
  "LEAVE_GAME",
  "END_TURN",
];
export const wsServerTypes = makeType('wsServer', ...serverKeys);
export const wsServer = makeSocketCommand("wsServer", ...serverKeys);
export const wsClientTypes = makeType('wsClient', ...clientKeys);
export const wsClient = makeSocketCommand("wsClient", ...clientKeys);
