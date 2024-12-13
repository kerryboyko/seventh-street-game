const charMap: Record<number | string, string> = {
  10: "T",
  11: "J",
  12: "Q",
  13: "K",
  14: "A",
  s: "♠",
  h: "♥",
  d: "♦",
  c: "♣",
};

export default class Card {
  constructor(
    public readonly rank: number,
    public readonly suit: "s" | "h" | "d" | "c"
  ) {}
  get display(): string {
    return `${charMap[this.rank] ? charMap[this.rank] : this.rank.toString()}${charMap[this.suit]}`;
  }
}
