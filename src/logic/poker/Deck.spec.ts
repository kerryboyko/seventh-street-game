import Deck from "./Deck";

describe("Deck", () => {
  const d = new Deck("seventhst test");

  it("creates a deck of cards", () => {
    expect(d.cards.length).toBe(52);
  });
  it("creates the french deck of cards", () => {
    let cardString = d.cards
      .map(({ rank, suit }) => `${rank}${suit}`)
      .join("|");
    expect(cardString).toBe(
      "2s|2d|2c|2h|3s|3d|3c|3h|4s|4d|4c|4h|5s|5d|5c|5h|6s|6d|6c|6h|7s|7d|7c|7h|8s|8d|8c|8h|9s|9d|9c|9h|10s|10d|10c|10h|11s|11d|11c|11h|12s|12d|12c|12h|13s|13d|13c|13h|14s|14d|14c|14h"
    );
    let cardDisplay = d.cards.map((card) => card.display).join("|");
    expect(cardDisplay).toBe(
      "2♠|2♦|2♣|2♥|3♠|3♦|3♣|3♥|4♠|4♦|4♣|4♥|5♠|5♦|5♣|5♥|6♠|6♦|6♣|6♥|7♠|7♦|7♣|7♥|8♠|8♦|8♣|8♥|9♠|9♦|9♣|9♥|T♠|T♦|T♣|T♥|J♠|J♦|J♣|J♥|Q♠|Q♦|Q♣|Q♥|K♠|K♦|K♣|K♥|A♠|A♦|A♣|A♥"
    );
  });
  it("deals the cards", () => {
    expect(d.debug.cursor).toBe(0);
    const topThreeCards = [1, 2, 3]
      .map(() => d.dealCard())
      .map((card) => card.display);
    expect(topThreeCards).toEqual(["2♠", "2♦", "2♣"]);
    expect(d.debug.cursor).toBe(3);
    const nextThreeCards = [4, 5, 6]
      .map(() => d.dealCard())
      .map((card) => card.display);
    expect(nextThreeCards).toEqual(["2♥", "3♠", "3♦"]);
  });
  it("deals multiple cards", () => {
    expect(d.debug.cursor).toBe(6);
    const pokerhand = d.dealCards(5);
    expect(pokerhand.map((card) => card.display)).toEqual([
      "3♣",
      "3♥",
      "4♠",
      "4♦",
      "4♣",
    ]);
    expect(d.debug.cursor).toBe(11);
  });
  it("will not deal past the end of the deck", () => {
    expect(() => d.dealCards(52)).toThrow(
      "Cannot deal 52 cards, the deck only contains 41 cards"
    );
    expect(d.debug.cursor).toBe(11); 
  });
  it("will not deal to the end of the deck manually", () => {
    d.dealCards(39);
    expect(d.debug.cursor).toBe(50); 
    d.dealCard();
    d.dealCard();
    expect(d.debug.cursor).toBe(52);
    expect(() => d.dealCard()).toThrow("Deck is empty")
  })
  it("shuffles the cards", () => {
    d.shuffle();
    expect(d.debug.cursor).toBe(0);
    let cardDisplay = d.cards.map((card) => card.display).join("|");
    expect(cardDisplay).toBe(
      "T♣|J♦|7♣|9♥|3♠|6♠|A♠|5♠|K♦|9♦|5♣|K♥|7♦|4♦|T♥|A♥|8♥|6♦|J♠|K♠|A♣|4♣|2♦|3♣|K♣|8♦|2♥|T♦|Q♥|8♠|Q♣|4♠|3♥|Q♦|3♦|2♣|5♥|9♣|8♣|6♣|T♠|A♦|7♠|2♠|Q♠|J♥|J♣|5♦|6♥|4♥|9♠|7♥"
    );
    const topThreeCards = [1, 2, 3]
      .map(() => d.dealCard())
      .map((card) => card.display);
    expect(topThreeCards).toEqual(["T♣", "J♦", "7♣"]);
    expect(d.debug.cursor).toBe(3);
    const nextThreeCards = [4, 5, 6]
      .map(() => d.dealCard())
      .map((card) => card.display);
    expect(nextThreeCards).toEqual(["9♥", "3♠", "6♠"]);
  });
  it("shuffles the cards the exact same way for the same seed", () => {
    const deck2 = new Deck("seventhst test");
    deck2.shuffle();
    expect(deck2.debug.cursor).toBe(0);
    let cardDisplay = deck2.cards.map((card) => card.display).join("|");
    expect(cardDisplay).toBe(
      "T♣|J♦|7♣|9♥|3♠|6♠|A♠|5♠|K♦|9♦|5♣|K♥|7♦|4♦|T♥|A♥|8♥|6♦|J♠|K♠|A♣|4♣|2♦|3♣|K♣|8♦|2♥|T♦|Q♥|8♠|Q♣|4♠|3♥|Q♦|3♦|2♣|5♥|9♣|8♣|6♣|T♠|A♦|7♠|2♠|Q♠|J♥|J♣|5♦|6♥|4♥|9♠|7♥"
    );
    const topThreeCards = [1, 2, 3]
      .map(() => deck2.dealCard())
      .map((card) => card.display);
    expect(topThreeCards).toEqual(["T♣", "J♦", "7♣"]);
    expect(deck2.debug.cursor).toBe(3);
    const nextThreeCards = [4, 5, 6]
      .map(() => deck2.dealCard())
      .map((card) => card.display);
    expect(nextThreeCards).toEqual(["9♥", "3♠", "6♠"]);
  });
});
