import Deck from "../poker/Deck";
import Card from "../poker/Card";
import Property from "./Property";
// The parks will be at index 0,
// 1 - 7 will be the corresponding streets.

const AVENUES = ["N", "E", "S", "W"];
const generateNeighborhood = (deck: Deck): Record<string, Property> => {
  deck.shuffle();
  const neighborhood: Record<string, Property> = {};
  for (let avenue of AVENUES) {
    for (let i = 0; i < 8; i++) {
      const name = `${avenue}${i}`;
      neighborhood[name] = new Property(
        name,
        i === 0 ? null : deck.dealCard(),
        i * 100,
        i === 0 ? "ACTION" : "PROPERTY"
      );
    }
  }
  return neighborhood;
};
export default class Board {
  private deck: Deck;
  private neighborhood: Record<string, Property>;
  public players: string[] = [];
  constructor(public seed?: string) {
    this.deck = new Deck(this.seed);
    this.neighborhood = generateNeighborhood(this.deck);
  }
  public debug = () => ({
    deck: this.deck,
    neighborhood: this.neighborhood,
  });
  public addPlayer = (playerName: string) => {
    if (this.players.includes(playerName)) {
      return false;
    }
    this.players.push(playerName);
    return true;
  };
  public getBoardState = (player?: string): Record<string, any> => {
    const acc: Record<string, any> = {};
    Object.values(this.neighborhood)
      .filter(({ type }) => type === "PROPERTY")
      .forEach((prop: Property) => {
        acc[prop.name] = prop.getState(player);
      });
      return acc;
  };

  public setOwner = (
    owner: string,
    propertyName: keyof Board["neighborhood"]
  ) => {
    if (!this.players.includes(owner)) {
      throw new Error(`No player named ${owner} is playing`);
    }
    if (!this.neighborhood[propertyName]) {
      throw new Error(`No property named ${propertyName} exists`);
    }
    this.neighborhood[propertyName].setOwner(owner);
  };
}
