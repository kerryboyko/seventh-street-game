import Card from "./Card";

describe("Card", () => {
  it("creates the three of clubs", () => {
    const threeOfClubs = new Card(3, "c");
    expect(threeOfClubs.rank).toBe(3);
    expect(threeOfClubs.suit).toBe("c");
    expect(threeOfClubs.value).toBe(3);
    expect(threeOfClubs.display).toBe("3♣");
  });
  it("creates the ace of spades", () => {
    const aceOfSpades = new Card(14, "s");
    expect(aceOfSpades.rank).toBe(14);
    expect(aceOfSpades.suit).toBe("s");
    expect(aceOfSpades.value).toBe(11);

    expect(aceOfSpades.display).toBe("A♠");
  });
  it("creates the queen of diamonds", () => {
    const queenOfDiamonds = new Card(12, "d");
    expect(queenOfDiamonds.rank).toBe(12);
    expect(queenOfDiamonds.suit).toBe("d");
    expect(queenOfDiamonds.value).toBe(10);

    expect(queenOfDiamonds.display).toBe("Q♦");
  });
  describe("static Card.cardsToText()", () => {
    it('converts cards to text', () => {
      const threeOfClubs = new Card(3, "c");
      const aceOfSpades = new Card(14, "s");
      const queenOfDiamonds = new Card(12, "d");
      expect(Card.cardsToText(threeOfClubs, aceOfSpades, queenOfDiamonds)).toBe("AsQd3c")

    })
  })
});
