import Card from "../Card";
import { makeBestPokerHand } from "./makeBestPokerHand";
import { makeHand } from "./makeHand";

describe("makeBestPokerHand()", () => {
  it("makes the best five card hand out of seven cards", () => {
    const threePair = "KcKs9c7hJd9h7c";
    const bestHand = makeBestPokerHand(makeHand(threePair));
    expect(bestHand.winningRank!.handScore).toBe(3);
    expect(bestHand.winners.map((hand) => Card.cardsToText(...hand))).toEqual([
      "KcKsJd9c9h",
    ]);
  });
});
