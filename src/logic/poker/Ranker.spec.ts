import Card from "./Card";
import Ranker from "./Ranker";
import { omit } from "radash";
import { makeHand } from "./utils/makeHand";

const sampleHands = {
  straightflush: ["AdKdQdJdTd", "9sTsJs8s7s", "2c4c5cAc3c"],
  quads: ["KdKcKhKs2s", "As2s2c2d2h"],
  boat: ["Kd2cKhKs2s", "As2sAc2d2h"],
  flush: ["Ad3d5d7d9d", "AsKsQs2s3s"],
  straight: ["AdKdQcJdTd", "9hTsJs8s7s", "2c4c5hAc3c"],
  trips: ["Kd2cKhKs3s", "As2s3c2d2h"],
  twopair: ["Kd2c3hKs2s", "As2sAc2d9h"],
  onepair: ["AdKdJcJdTd", "7hTsJs8s7s", "2c4c3hAc3c"],
  highcard: ["Ad3d5c7d9d", "AsKsQs2s3c"],
};

describe("Ranker", () => {
  describe("correctly evaluates hands within the same handrank", () => {
    it("correctly evaluates hands", () => {
      expect(
        Ranker.findHandRank(makeHand("2c4c5cAc3c") as Card[]).handRank
      ).toBe("straightflush");
      for (const [rankName, hands] of Object.entries(sampleHands)) {
        for (const hand of hands) {
          const cardHand = makeHand(hand);
          expect(Ranker.findHandRank(cardHand as Card[]).handRank).toBe(
            rankName
          );
        }
      }
    });
    it("correctly compares high card hands based on their evaluation", () => {
      const highCard = Ranker.findWinningHand(
        makeHand("Ad3d5c7d9d"),
        makeHand("AsKsQs2s3c")
      );
      expect(highCard.winningRank!.handScore).toBe(1);
      expect(highCard.winners.map((hand) => Card.cardsToText(...hand))).toEqual(
        ["AsKsQs3c2s"]
      );
      const highCardTie = Ranker.findWinningHand(
        makeHand("Ad3d5c7d9d"),
        makeHand("Ad3d5c7d9c")
      );
      expect(highCardTie.winningRank!.handScore).toBe(1);
      expect(
        highCardTie.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["Ad9d7d5c3d", "Ad9c7d5c3d"]);
    });

    it("correctly compares one pair hands based on their evaluation", () => {
      const oneP = Ranker.findWinningHand(...sampleHands.onepair.map(makeHand));
      expect(oneP.winningRank!.handScore).toBe(2);
      expect(oneP.winners.map((hand) => Card.cardsToText(...hand))).toEqual([
        "AdKdJcJdTd",
      ]);
      const onePTie = Ranker.findWinningHand(
        makeHand("Ad3d7c7d9d"),
        makeHand("Ad3d7c7d9c")
      );
      expect(onePTie.winningRank!.handScore).toBe(2);
      expect(onePTie.winners.map((hand) => Card.cardsToText(...hand))).toEqual([
        "Ad9d7c7d3d",
        "Ad9c7c7d3d",
      ]);
      const onePKicker = Ranker.findWinningHand(
        makeHand("Ad3d7c7d8d"),
        makeHand("Ad3d7c7d9c")
      );
      expect(onePKicker.winningRank!.handScore).toBe(2);
      expect(
        onePKicker.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["Ad9c7c7d3d"]);
    });
    it("correctly compares two pair hands based on their evaluation", () => {
      const twoP = Ranker.findWinningHand(...sampleHands.twopair.map(makeHand));
      expect(twoP.winningRank!.handScore).toBe(3);
      expect(twoP.winners.map((hand) => Card.cardsToText(...hand))).toEqual([
        "AsAc9h2s2d",
      ]);
      const twoPTie = Ranker.findWinningHand(
        makeHand("Ad9d7c7d9h"),
        makeHand("Ad9d7c7d9c")
      );
      expect(twoPTie.winningRank!.handScore).toBe(3);
      expect(twoPTie.winners.map((hand) => Card.cardsToText(...hand))).toEqual([
        "Ad9d9h7c7d",
        "Ad9d9c7c7d",
      ]);

      const twoPKicker = Ranker.findWinningHand(
        makeHand("Ad9d7c7d9h"),
        makeHand("Kd9d7c7d9c")
      );
      expect(twoPKicker.winningRank!.handScore).toBe(3);
      expect(
        twoPKicker.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["Ad9d9h7c7d"]);
    });
    it("correctly compares trips hands based on their evaluation", () => {
      const trips = Ranker.findWinningHand(...sampleHands.trips.map(makeHand));
      expect(trips.winningRank!.handScore).toBe(4);
      expect(trips.winners.map((hand) => Card.cardsToText(...hand))).toEqual([
        "KdKhKs3s2c",
      ]);
      const tripsTie = Ranker.findWinningHand(
        makeHand("Ad9d7c7d7s"),
        makeHand("Ad9c7c7d7h")
      );
      expect(tripsTie.winningRank!.handScore).toBe(4);
      expect(tripsTie.winners.map((hand) => Card.cardsToText(...hand))).toEqual(
        ["Ad9d7c7d7s", "Ad9c7c7d7h"]
      );

      const tripsKicker = Ranker.findWinningHand(
        makeHand("Ad9d7c7d7s"),
        makeHand("Kd9c7c7d7h")
      );
      expect(tripsKicker.winningRank!.handScore).toBe(4);
      expect(
        tripsKicker.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["Ad9d7c7d7s"]);
    });
    it("correctly compares straight hands based on their evaluation", () => {
      const strt = Ranker.findWinningHand(
        ...sampleHands.straight.map(makeHand)
      );
      expect(strt.winningRank!.handScore).toBe(5);
      expect(strt.winners.map((hand) => Card.cardsToText(...hand))).toEqual([
        "AdKdQcJdTd",
      ]);
      const strtWheel = Ranker.findWinningHand(
        makeHand("9hTsJs8s7s"),
        makeHand("2c4c5hAc3c")
      );
      expect(strtWheel.winningRank!.handScore).toBe(5);
      expect(
        strtWheel.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["JsTs9h8s7s"]);
      const strtTie = Ranker.findWinningHand(
        makeHand("AdKdQcJdTd"),
        makeHand("AhKdQcJdTc")
      );
      expect(strtTie.winningRank!.handScore).toBe(5);
      expect(strtTie.winners.map((hand) => Card.cardsToText(...hand))).toEqual([
        "AdKdQcJdTd",
        "AhKdQcJdTc",
      ]);
    });
    it("correctly compares flush hands based on their evaluation", () => {
      const flush = Ranker.findWinningHand(...sampleHands.flush.map(makeHand));
      expect(flush.winningRank!.handScore).toBe(6);
      expect(flush.winners.map((hand) => Card.cardsToText(...hand))).toEqual([
        "AsKsQs3s2s",
      ]);
      const flushTie = Ranker.findWinningHand(
        makeHand("Ad3d5d7d9d"),
        makeHand("Ah3h5h7h9h")
      );
      expect(flushTie.winningRank!.handScore).toBe(6);
      expect(flushTie.winners.map((hand) => Card.cardsToText(...hand))).toEqual(
        ["Ad9d7d5d3d", "Ah9h7h5h3h"]
      );
      const flushKicker = Ranker.findWinningHand(
        makeHand("Ad3d5d7d9d"),
        makeHand("Ad3d5d8d9d")
      );
      expect(flushKicker.winningRank!.handScore).toBe(6);
      expect(
        flushKicker.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["Ad9d8d5d3d"]);
    });
    it("correctly compares boat hands based on their evaluation", () => {
      const boat = Ranker.findWinningHand(...sampleHands.boat.map(makeHand));
      expect(boat.winningRank!.handScore).toBe(7);
      expect(boat.winners.map((hand) => Card.cardsToText(...hand))).toEqual([
        "KdKhKs2c2s",
      ]);
      const boatTie = Ranker.findWinningHand(
        makeHand("Kd2cKhKs2s"),
        makeHand("Kd2hKhKc2s")
      );
      expect(boatTie.winningRank!.handScore).toBe(7);
      expect(boatTie.winners.map((hand) => Card.cardsToText(...hand))).toEqual([
        "KdKhKs2c2s",
        "KdKhKc2h2s",
      ]);

      const boatHighTrips = Ranker.findWinningHand(
        makeHand("Ad4c4hAs4s"),
        makeHand("Kd2hKhKc2s")
      );
      expect(boatHighTrips.winningRank!.handScore).toBe(7);
      expect(
        boatHighTrips.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["KdKhKc2h2s"]);
      const boatHighPair = Ranker.findWinningHand(
        makeHand("Ad4c4hAs4s"),
        makeHand("9d4c4hAs4s")
      );
      expect(boatHighPair.winningRank!.handScore).toBe(7);
      expect(
        boatHighPair.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["AdAs4c4h4s"]);
    });

    it("correctly compares quads hands based on their evaluation", () => {
      const quads = Ranker.findWinningHand(...sampleHands.quads.map(makeHand));
      expect(quads.winningRank!.handScore).toBe(8);
      expect(quads.winners.map((hand) => Card.cardsToText(...hand))).toEqual([
        "KdKcKhKs2s",
      ]);
      const quadsTie = Ranker.findWinningHand(
        makeHand("KdKcKhKs2d"),
        makeHand("KdKcKhKs2s")
      );
      expect(quadsTie.winningRank!.handScore).toBe(8);
      expect(quadsTie.winners.map((hand) => Card.cardsToText(...hand))).toEqual(
        ["KdKcKhKs2d", "KdKcKhKs2s"]
      );
      const quadKickers = Ranker.findWinningHand(
        makeHand("KdKcKhKs2d"),
        makeHand("KdKcKhKs7s")
      );
      expect(quadKickers.winningRank!.handScore).toBe(8);
      expect(
        quadKickers.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["KdKcKhKs7s"]);
    });

    it("correctly compares straightFlush based on their evaluation", () => {
      const straightflush = Ranker.findWinningHand(
        ...sampleHands.straightflush.map(makeHand)
      );
      expect(straightflush.winningRank!.handScore).toBe(9);
      expect(
        straightflush.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["AdKdQdJdTd"]);
      const straightFlushWheel = Ranker.findWinningHand(
        makeHand("AdKdQdJdTd"),
        makeHand("Ad2d3d4d5d")
      );
      expect(
        straightFlushWheel.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["AdKdQdJdTd"]);
      const straightFlushTie = Ranker.findWinningHand(
        makeHand("9sTsJs8s7s"),
        makeHand("9cTcJc8c7c")
      );
      expect(
        straightFlushTie.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["JsTs9s8s7s", "JcTc9c8c7c"]);
    });
  });
  describe("correctly ranks hands in order based on hand rank", () => {
    it("ranks items in order", () => {
      const makeHandsButNotTheseHands = (...omitThese: any[]) =>
        Ranker.findWinningHand(
          ...Object.values(omit(sampleHands, omitThese))
            .flat()
            .map((hand: any) => makeHand(hand))
        );

      let winnerCircle = makeHandsButNotTheseHands();
      expect(winnerCircle.winningRank!.handScore).toBe(9);
      expect(
        winnerCircle.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["AdKdQdJdTd"]);
      winnerCircle = makeHandsButNotTheseHands("straightflush");
      expect(winnerCircle.winningRank!.handScore).toBe(8);
      expect(
        winnerCircle.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["KdKcKhKs2s"]);
      winnerCircle = makeHandsButNotTheseHands("straightflush", "quads");
      expect(winnerCircle.winningRank!.handScore).toBe(7);
      expect(
        winnerCircle.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["KdKhKs2c2s"]);
      winnerCircle = makeHandsButNotTheseHands(
        "straightflush",
        "quads",
        "boat"
      );
      expect(winnerCircle.winningRank!.handScore).toBe(6);
      expect(
        winnerCircle.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["AsKsQs3s2s"]);
      winnerCircle = makeHandsButNotTheseHands(
        "straightflush",
        "quads",
        "boat",
        "flush"
      );
      expect(winnerCircle.winningRank!.handScore).toBe(5);
      expect(
        winnerCircle.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["AdKdQcJdTd"]);
      winnerCircle = makeHandsButNotTheseHands(
        "straightflush",
        "quads",
        "boat",
        "flush",
        "straight"
      );
      expect(winnerCircle.winningRank!.handScore).toBe(4);
      expect(
        winnerCircle.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["KdKhKs3s2c"]);
      winnerCircle = makeHandsButNotTheseHands(
        "straightflush",
        "quads",
        "boat",
        "flush",
        "straight",
        "trips"
      );
      expect(winnerCircle.winningRank!.handScore).toBe(3);
      expect(
        winnerCircle.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["AsAc9h2s2d"]);
      winnerCircle = makeHandsButNotTheseHands(
        "straightflush",
        "quads",
        "boat",
        "flush",
        "straight",
        "trips",
        "twopair"
      );
      expect(winnerCircle.winningRank!.handScore).toBe(2);
      expect(
        winnerCircle.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["AdKdJcJdTd"]);
      winnerCircle = makeHandsButNotTheseHands(
        "straightflush",
        "quads",
        "boat",
        "flush",
        "straight",
        "trips",
        "twopair",
        "onepair"
      );
      expect(winnerCircle.winningRank!.handScore).toBe(1);
      expect(
        winnerCircle.winners.map((hand) => Card.cardsToText(...hand))
      ).toEqual(["AsKsQs3c2s"]);
    });
  });
});
