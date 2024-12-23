import { Socket } from "socket.io";
import Game from "../Game/Game.js";
import { syncCodeGenerator } from "./syncCodeGenerator.js";

// this class is a singleton.
export default class GameRegistration {
  private static instance: GameRegistration | null = null;
  private games = new Map<string, Game>();
  private constructor() {}
  static getInstance(): GameRegistration {
    if (!GameRegistration.instance) {
      GameRegistration.instance = new GameRegistration();
    }
    return GameRegistration.instance;
  }
  public createGame = (seed?: string): string => {
    const syncCode = syncCodeGenerator();
    // avoid duplicates. 
    if(this.games.has(syncCode)){
      return this.createGame();
    }
    const game = new Game(syncCode, seed);
    this.games.set(syncCode, game);
    return syncCode;
  }
  public getGame = (syncCode: string): Game | undefined => {
    return this.games.get(syncCode);
  }
  
}
