import { StringDecoder } from "string_decoder";
const decoder = new StringDecoder("utf8");

export const parseMessage = (message: ArrayBuffer): string | unknown => {
  const decoded = decoder.write(Buffer.from(message));
  try {
    return JSON.parse(decoded);
  } catch (_e) {
    return decoded as string;
  }
};
