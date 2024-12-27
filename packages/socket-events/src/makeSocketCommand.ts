export interface SocketCommandAction {
  action: string;
  payload: any;
}
export type SocketCommand = (payload: string) => SocketCommandAction;

export const makeSocketCommand = (
  key: string,
  ...values: string[]
): Record<string, SocketCommand> => {
  const output: Record<string, SocketCommand> = {};
  for (let value of values) {
    output[value] = (payload: any) => ({ action: `${key}.${value}`, payload });
  }
  return output;
};

export default makeSocketCommand;
