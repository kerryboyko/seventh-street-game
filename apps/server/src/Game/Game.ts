import Board from "./Board";

enum GameStatus {
  IDLE = "IDLE",
  RUNNING = "RUNNING",
  CONCLUDED = "CONCLUDED",
}
export default class Game {
  public players: string[] = [];
  public board: Board;
  public status: GameStatus = GameStatus.IDLE;
  constructor(
    private syncCode: string,
    public seed?: string
  ) {
    this.board = new Board(this.players, seed);
  }
  public debug = () => ({
    board: this.board.debug(),
    status: this.status,
    syncCode: this.syncCode,
    seed: this.seed,
    players: this.players,
  });
  public addPlayer = (playerName: string): boolean => {
    if (this.status !== GameStatus.IDLE || this.players.includes(playerName)) {
      return false;
    }
    this.players.push(playerName);
    return true;
  };
  public removePlayer = (playerName: string) => {
    this.players = this.players.filter((name) => name !== playerName);
  };
}
