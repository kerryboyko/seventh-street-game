import { invert } from "radash";

type SuitCharacters = "s" | "h" | "d" | "c";

const rankMapper: Record<number, string> = {
  10: "T",
  11: "J",
  12: "Q",
  13: "K",
  14: "A",
};
const suitMapper: Record<SuitCharacters, string> = {
  s: "♠",
  h: "♥",
  d: "♦",
  c: "♣",
};

const invertRankMapper = invert(rankMapper);
const invertSuitMapper = invert(suitMapper);

export default class Card {
  constructor(
    public readonly rank: number,
    public readonly suit: SuitCharacters
  ) {}
  get display(): string {
    return `${rankMapper[this.rank] ? rankMapper[this.rank] : this.rank.toString()}${suitMapper[this.suit]}`;
  }
  get value(): number {
    if (this.rank === 14) {
      return 11;
    }
    if (this.rank > 10) {
      return 10;
    }
    return this.rank;
  }
  // creates a card just from a two-character
  public static create = (input: string) => {
    const [rankChar, suitChar] = input.split("");
    const suit = invertSuitMapper[suitChar] || suitChar;
    const rank = parseInt((invertRankMapper[rankChar] || rankChar) as string, 10);
    if (!suit || !rank) {
      throw new TypeError(`Input ${input} is not a valid card.`);
    }
    return new Card(rank, suit);
  };
}
