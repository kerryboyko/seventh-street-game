import { UserData, WebSocket } from "uWebSockets.js";
import { v4 as uuidv4 } from "uuid";
import util from "util";

/* 
  Do not use ws's build in .getUserData() method.
   It returns a circular object, which is GREAT for C++
   but is just stupid in typescript. Instead, reassign
   userData to be a plain object. 
*/

/* SINGLETON */
export default class UserRegistration {
  private static instance: UserRegistration | null = null;
  private idToSocketMap = new Map<string, WebSocket<UserData>>();
  private nameToIdMap = new Map<string, string>();
  private idToNameMap = new Map<string, string>();
  private constructor() {}
  static getInstance = (): UserRegistration => {
    if (!UserRegistration.instance) {
      UserRegistration.instance = new UserRegistration();
    }
    return UserRegistration.instance;
  };
  public setUserData = (id: string, data: UserData): void | never => {
    const ws = this.idToSocketMap.get(id);
    if (ws) {
      ws.userData = data;
    } else {
      throw new Error(`Cannot find websocket ${id}`);
    }
  };
  public mergeUserData = (id: string, data: UserData): UserData => {
    const ws = this.idToSocketMap.get(id);
    if (ws) {
      const oldUserData = ws.userData;
      ws.userData = {...oldUserData, data};
    } else {
      throw new Error(`Cannot find websocket ${id}`);
    }
    return ws.userData;
  };
  public registerSocket = (ws: WebSocket<UserData>): string => {
    const id = uuidv4();
    this.idToSocketMap.set(id, ws);
    ws.userData = { id };
    return id;
  };
  public getSocket = (id: string): WebSocket<UserData> => {
    const ws = this.idToSocketMap.get(id);
    if (ws) {
      return ws;
    }
    throw new Error(`User ${id} does not exist`);
  };
  public setName = (id: string, name: string): void => {
    this.nameToIdMap.set(name, id);
    this.idToNameMap.set(id, name);
    this.mergeUserData(id, { name });
  };
  public getName = (id: string): string | undefined => {
    return this.idToNameMap.get(id);
  };
  public getIdFromName = (name: string): string | undefined => {
    return this.nameToIdMap.get(name);
  };
}
