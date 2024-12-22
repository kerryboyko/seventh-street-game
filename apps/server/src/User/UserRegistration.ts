import { Socket } from "socket.io";

// this class is a singleton.
export default class UserRegistration {
  private static instance: UserRegistration | null = null;
  private sockets = new Map<string, Socket>();
  private nameBySocketId = new Map<string, string>();
  private socketIdByName = new Map<string, string>();
  private constructor() {}
  static getInstance(): UserRegistration {
    if (!UserRegistration.instance) {
      UserRegistration.instance = new UserRegistration();
    }
    return UserRegistration.instance;
  }
  public registerSocket = (socket: Socket) => {
    console.log('registering socket?')
    this.sockets.set(socket.id, socket);
  };
  public registerName = (socket: Socket, name: string) => {
    if (this.socketIdByName.get(name)) {
      throw new Error(`Name ${name} already exists and is registered`);
    }
    this.socketIdByName.set(name, socket.id);
    this.nameBySocketId.set(socket.id, name);
  };
  public removeUser = (socketId: string) => {
    const name = this.nameBySocketId.get(socketId);
    this.nameBySocketId.delete(socketId);
    if (name) {
      this.socketIdByName.delete(name);
    }
    this.sockets.delete(socketId);
  };
  public debug = () => {
    console.log({
      sockets: this.sockets.keys(),
      nameBySocketId: Object.fromEntries(this.nameBySocketId),
      socketIdByName: Object.fromEntries(this.socketIdByName),
    });
  };
}
