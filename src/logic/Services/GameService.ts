import { Server } from "socket.io";
import Game from "../Game/Game";
import { syncCodeGenerator } from "./syncCodeGenerator";
import Fastify from "fastify";
import fastifyIO from "fastify-socket.io";

declare module "fastify" {
  interface FastifyInstance {
    io: Server<any>;
  }
}

export default class GameService {
  private games: Record<string, Game> = {};
  private wsServer;
  constructor(public port: number = 3000) {
    this.wsServer = this.createServer(port);
  }
  createServer = (port: number) => {
    const app = Fastify({ logger: true });
    app.register(fastifyIO);
    app.get("/", function (request, reply) {
      reply.send({ hello: "world" });
    });
    app.get("/io/hello", (req, reply) => {
      app.io.emit("hello");
    });
    app.ready().then(() => {
      app.io.on("connection", (socket) => {
        console.log({ socket });
      });
    });
    // Run the server!
    app.listen({ port: 3000 }, function (err, address) {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      // Server is now listening on ${address}
    });
    return app;
  };
  closeServer = async (): Promise<boolean> => {
    try {
      console.log("closeServer")
      await this.wsServer.close();
      console.log("server closed")
      return true;
    } catch (err) {
      console.error(err);
      return Promise.reject(false);
    }
  };
  createGame = (seed?: string): Game => {
    const syncCode = syncCodeGenerator();
    if (this.games[syncCode]) {
      // recurse if the code is in use.
      return this.createGame(seed);
    }
    this.games[syncCode] = new Game(syncCode, seed);
    return this.games[syncCode];
  };
  endGame = (syncCode: string): void => {
    delete this.games[syncCode];
  };
}
