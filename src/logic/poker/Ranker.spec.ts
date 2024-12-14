import Card from "./Card";
import Ranker from "./Ranker";

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

const makeHand = (str: string): Card[] =>
  str.match(/.{1,2}/g)?.map(Card.create) as Card[];

describe("Ranker", () => {
  it("correctly evaluates hands", () => {
    expect(Ranker.findHandRank(makeHand("2c4c5cAc3c") as Card[]).handRank).toBe(
      "straightflush"
    );
    for (const [rankName, hands] of Object.entries(sampleHands)) {
      for (const hand of hands) {
        const cardHand = makeHand(hand);
        expect(Ranker.findHandRank(cardHand as Card[]).handRank).toBe(rankName);
      }
    }
  });
  it("correctly compares high card hands based on their evaluation", () => {
    const highCard = Ranker.findWinningHand(
      makeHand("Ad3d5c7d9d"),
      makeHand("AsKsQs2s3c")
    );
    expect(highCard.winningRank!.handScore).toBe(1);
    expect(
      highCard.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,s;13,s;12,s;2,s;3,c"]);
    const highCardTie = Ranker.findWinningHand(
      makeHand("Ad3d5c7d9d"),
      makeHand("Ad3d5c7d9c")
    );
    expect(highCardTie.winningRank!.handScore).toBe(1);
    expect(
      highCardTie.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,d;3,d;5,c;7,d;9,d", "14,d;3,d;5,c;7,d;9,c"]);
  });

  it("correctly compares one pair hands based on their evaluation", () => {
    const oneP = Ranker.findWinningHand(...sampleHands.onepair.map(makeHand));
    expect(oneP.winningRank!.handScore).toBe(2);
    expect(
      oneP.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,d;13,d;11,c;11,d;10,d"]);
    const onePTie = Ranker.findWinningHand(
      makeHand("Ad3d7c7d9d"),
      makeHand("Ad3d7c7d9c")
    );
    expect(onePTie.winningRank!.handScore).toBe(2);
    expect(
      onePTie.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,d;3,d;7,c;7,d;9,d", "14,d;3,d;7,c;7,d;9,c"]);
    const onePKicker = Ranker.findWinningHand(
      makeHand("Ad3d7c7d8d"),
      makeHand("Ad3d7c7d9c")
    );
    expect(onePKicker.winningRank!.handScore).toBe(2);
    expect(
      onePKicker.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,d;3,d;7,c;7,d;9,c"]);
  });
  it("correctly compares two pair hands based on their evaluation", () => {
    const twoP = Ranker.findWinningHand(...sampleHands.twopair.map(makeHand));
    expect(twoP.winningRank!.handScore).toBe(3);
    expect(
      twoP.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,s;2,s;14,c;2,d;9,h"]);
    const twoPTie = Ranker.findWinningHand(
      makeHand("Ad9d7c7d9h"),
      makeHand("Ad9d7c7d9c")
    );
    expect(twoPTie.winningRank!.handScore).toBe(3);
    expect(
      twoPTie.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,d;9,d;7,c;7,d;9,h", "14,d;9,d;7,c;7,d;9,c"]);

    const twoPKicker = Ranker.findWinningHand(
      makeHand("Ad9d7c7d9h"),
      makeHand("Kd9d7c7d9c")
    );
    expect(twoPKicker.winningRank!.handScore).toBe(3);
    expect(
      twoPKicker.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,d;9,d;7,c;7,d;9,h"]);
  });
  it("correctly compares trips hands based on their evaluation", () => {
    const trips = Ranker.findWinningHand(...sampleHands.trips.map(makeHand));
    expect(trips.winningRank!.handScore).toBe(4);
    expect(
      trips.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["13,d;2,c;13,h;13,s;3,s"]);
    const tripsTie = Ranker.findWinningHand(
      makeHand("Ad9d7c7d7s"),
      makeHand("Ad9c7c7d7h")
    );
    expect(tripsTie.winningRank!.handScore).toBe(4);
    expect(
      tripsTie.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,d;9,d;7,c;7,d;7,s", "14,d;9,c;7,c;7,d;7,h"]);

    const tripsKicker = Ranker.findWinningHand(
      makeHand("Ad9d7c7d7s"),
      makeHand("Kd9c7c7d7h")
    );
    expect(tripsKicker.winningRank!.handScore).toBe(4);
    expect(
      tripsKicker.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,d;9,d;7,c;7,d;7,s"]);
  });
  it("correctly compares straight hands based on their evaluation", () => {
    const strt = Ranker.findWinningHand(...sampleHands.straight.map(makeHand));
    expect(strt.winningRank!.handScore).toBe(5);
    expect(
      strt.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,d;13,d;12,c;11,d;10,d"]);
    const strtWheel = Ranker.findWinningHand(
      makeHand("9hTsJs8s7s"),
      makeHand("2c4c5hAc3c")
    );
    expect(strtWheel.winningRank!.handScore).toBe(5);
    expect(
      strtWheel.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["9,h;10,s;11,s;8,s;7,s"]);
    const strtTie = Ranker.findWinningHand(
      makeHand("AdKdQcJdTd"),
      makeHand("AhKdQcJdTc")
    );
    expect(strtTie.winningRank!.handScore).toBe(5);
    expect(
      strtTie.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,d;13,d;12,c;11,d;10,d", "14,h;13,d;12,c;11,d;10,c"]);
  });
  it("correctly compares flush hands based on their evaluation", () => {
    const flush = Ranker.findWinningHand(...sampleHands.flush.map(makeHand));
    expect(flush.winningRank!.handScore).toBe(6);
    expect(
      flush.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,s;13,s;12,s;2,s;3,s"]);
    const flushTie = Ranker.findWinningHand(
      makeHand("Ad3d5d7d9d"),
      makeHand("Ah3h5h7h9h")
    );
    expect(flushTie.winningRank!.handScore).toBe(6);
    expect(
      flushTie.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,d;3,d;5,d;7,d;9,d", "14,h;3,h;5,h;7,h;9,h"]);

    const flushKicker = Ranker.findWinningHand(
      makeHand("Ad3d5d7d9d"),
      makeHand("Ad3d5d8d9d")
    );
    expect(flushKicker.winningRank!.handScore).toBe(6);
    expect(
      flushKicker.winners.map((hand) =>
        hand.map(({ rank, suit }) => `${rank},${suit}`).join(";")
      )
    ).toEqual(["14,d;3,d;5,d;8,d;9,d"]);
  });
});
