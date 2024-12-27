import { WebSocket, UserData } from "uWebSockets.js";
import { wsClient, wsServer, wsClientTypes, wsServerTypes } from "@repo/socket-events";

interface Action {
  action: keyof typeof wsClient | keyof typeof wsServer;
  payload?: any;
}

const isAction = (message: unknown): message is Action => {
  return (
    typeof message === 'object' &&
    message !== null &&
    "action" in message &&
    typeof message.action === "string" &&
    Object.keys(wsClientTypes).concat(Object.keys(wsServerTypes)).includes(message.action)
  );
};

export const processMessage = async (
  ws: WebSocket<UserData>,
  message: Action | unknown
): Promise<any | never> => {
  // If the message is incorrectly formatted.
  if (!isAction(message)) {
    ws.send(
      JSON.stringify({
        action: wsServer.LOG_ME,
        payload: {
          error: true,
          message: `Improperly formatted message ${message}`,
        },
      })
    );
    throw new Error(`Improperly formatted message: ${message}`);
  }

  if(message.action === wsClientTypes.LOG_ME){
    console.log(message.payload);
    return;
  }

  // default. This is an unhandled action. 
  console.log(`Unhandled Action: ${message.action}`)
  ws.send(
    JSON.stringify({
      action: wsServer.LOG_ME,
      payload: {
        error: true,
        message: `Unhandled Action: ${message.action}`,
      },
    })
  );
};
