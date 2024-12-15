import { invert } from "radash";
import Deck from "./poker/Deck";
import Card from "./poker/Card";

// The parks will be at index 0,
// 1 - 7 will be the corresponding streets.

interface Property {
  name: string;
  card: null | Card;
  revealed: boolean;
  owner: string | null;
  scored: boolean;
  price: number;
  type: "ACTION" | "PROPERTY";
  visibleToThesePlayers: Set<string>;
}

interface OutputProperty
  extends Pick<Property, "name" | "revealed" | "owner" | "scored" | "price"> {
  cardDisplay: string;
}

const AVENUES = ["N", "E", "S", "W"];
const generateNeighborhood = (deck: Deck): Record<string, Property> => {
  deck.shuffle();
  const neighborhood: Record<string, Property> = {};
  for (let avenue of AVENUES) {
    for (let i = 0; i < 8; i++) {
      const name = `${avenue}${i}`;
      neighborhood[name] = {
        name,
        card: i === 0 ? null : deck.dealCard(),
        revealed: false,
        visibleToThesePlayers: new Set<string>([]),
        owner: null,
        scored: false,
        price: i * 100,
        type: i === 0 ? "ACTION" : "PROPERTY",
      };
    }
  }
  return neighborhood;
};
export default class Board {
  private deck: Deck;
  private neighborhood;
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
  public getBoardState = (player?: string): Record<string, OutputProperty> => {
    const output: Record<string, OutputProperty> = {};
    for (const name in this.neighborhood) {
      let {
        card,
        revealed,
        visibleToThesePlayers,
        owner,
        scored,
        price,
        type,
      } = this.neighborhood[name];
      if (type === "ACTION" || card === null) {
        continue;
      }
      const visible = revealed || (player && visibleToThesePlayers.has(player));
      output[name] = {
        name,
        cardDisplay: visible ? card?.display : "??",
        price,
        scored,
        owner,
        revealed,
      };
    }
    return output;
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
    this.neighborhood[propertyName].owner = owner;
    this.neighborhood[propertyName].visibleToThesePlayers.add(owner);
  };
}
