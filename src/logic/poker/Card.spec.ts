import Card from "./Card";

describe("Card", () => {
  it("creates the three of clubs", () => {
    const threeOfClubs = new Card(3, "c");
    expect(threeOfClubs.rank).toBe(3);
    expect(threeOfClubs.suit).toBe("c");
    expect(threeOfClubs.display).toBe("3♣");
  });
  it("creates the ace of spades", () => {
    const threeOfClubs = new Card(14, "s");
    expect(threeOfClubs.rank).toBe(14);
    expect(threeOfClubs.suit).toBe("s");
    expect(threeOfClubs.display).toBe("A♠");
  });
});
