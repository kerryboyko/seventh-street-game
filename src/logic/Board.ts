import { invert } from "radash";
import Deck from "./poker/Deck";

// The parks will be at index 0,
// 1 - 7 will be the corresponding streets.
const AVENUES = ["N", "E", "S", "W"];
const generateNeighborhood = (deck: Deck) => {
  deck.shuffle();
  const ids: string[] = [];
  const neighborhood: Record<string, unknown> = {};
  for (let avenue of AVENUES) {
    for (let i = 0; i < 8; i++) {
      const name = `${avenue}${i}`;
      ids.push(name);
      neighborhood[name] = {
        name,
        card: deck.dealCard(),
        revealed: false,
        visibleToThesePlayers: [],
        owner: null,
        scored: false,
      };
    }
  }
  return { ids, neighborhood };
};
export default class Board {
  private deck: Deck;
  private neighborhood;
  constructor(public seed?: string) {
    this.deck = new Deck(this.seed);
    this.neighborhood = generateNeighborhood(this.deck);
  }
  public debug = () => ({
    deck: this.deck,
    neighborhood: this.neighborhood,
  });
}
