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
    let [rankChar, suitChar] = input.split("");
   const suit = invertSuitMapper[suitChar] || suitChar;
    let rank: number = 0
    if(rankChar === 'T'){
      rank = 10;
    } else if (rankChar === 'J'){
      rank = 11;
    } else if (rankChar === 'Q'){
      rank = 12;
    } else if (rankChar === 'K'){
      rank = 13;
    } else if (rankChar === 'A'){
      rank = 14
    } else {
      rank = parseInt(rankChar, 10);
    }
    if (typeof suit !== 'string' || typeof rank !== 'number') {
      throw new TypeError(`Input ${input} is not a valid card.`);
    }
    return new Card(rank, suit);
  };
}
