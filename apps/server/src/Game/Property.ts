import Card from "../poker/Card";

export default class Property {
  public revealed: boolean = false;
  private owner: string | null = null;
  public scored: boolean = false;
  public visibleToThesePlayers = new Set<string>();
  constructor(
    public name: string,
    public card: Card | null,
    public price: number,
    public type: "ACTION" | "PROPERTY"
  ) {}

  public getState = (player?: string): Record<string, any> => {
    const { revealed, owner, scored, price, type, name } = this;
    const visible =
      revealed || (player && this.visibleToThesePlayers.has(player));
    return {
      revealed,
      owner,
      scored,
      price,
      type,
      name,
      cardDisplay: visible ? this.card?.display : "??",
    };
  };
  public setOwner = (player: string): void => {
    this.owner = player;
    this.visibleToThesePlayers.add(player);
  }
  public revealToPlayer = (player: string) => {
    this.visibleToThesePlayers.add(player);
  }
}
