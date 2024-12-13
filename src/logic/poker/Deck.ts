import seedrandom from "seedrandom";
import Card from "./Card";

export default class Deck {
  public cards: Card[] = [];
  private cursor: number = 0;
  private rng: seedrandom.PRNG;
  private length: number;
  constructor(public seed: string | undefined) {
    this.rng = seedrandom(seed);
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].forEach((rank: Card["rank"]) =>
      (["s", "d", "c", "h"] as Card["suit"][]).forEach((suit: Card["suit"]) => {
        this.cards.push(new Card(rank, suit));
      })
    );
    this.length = this.cards.length;
  }
  get debug() {
    return {
      cards: this.cards,
      cursor: this.cursor,
      remaining: this.remaining,
      length: this.length,
    };
  }
  get remaining (){
    return this.length - this.cursor;
  }
  public dealCard = (): Card | never => {
    if (this.cursor >= this.length) {
      throw new Error(`Deck is empty`);
    }
    const topCard = this.cards[this.cursor];
    this.cursor += 1;
    return topCard;
  };
  public dealCards = (n: number = 1): Card[] | never => {
    if (n + this.cursor > this.length) {
      throw new Error(
        `Cannot deal ${n} cards, the deck only contains ${this.length - this.cursor} cards`
      );
    }
    return Array(n).fill(null).map(this.dealCard);
  };
  public shuffle() {
    this.cursor = 0;
    let index;
    let temp;
    for (let i = 0, l = this.length; i < this.length; i++) {
      index = Math.floor(this.rng() * this.length);
      temp = this.cards[i];
      this.cards[i] = this.cards[index];
      this.cards[index] = temp;
    }
  }
}
