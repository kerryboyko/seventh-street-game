import Card from "./Card";
import { invert, isEqual } from "radash";

export interface EvaluatedHandRank {
  handRank: string;
  handScore: number;
  ranks: number[];
  hand: Card[];
}

// we want to memoize this, I think;
const mapToRanks = (() => {
  const cache: Record<string, Record<number, number>> = {};
  return (cards: Card[]): Record<number, number> => {
    const stringifiedParams = cards
      .map(({ rank, suit }) => `${rank}${suit}`)
      .sort()
      .join("");
    if (cache[stringifiedParams]) {
      return cache[stringifiedParams];
    }
    cache[stringifiedParams] = {};
    for (const card of cards) {
      if (!cache[stringifiedParams][card.rank]) {
        cache[stringifiedParams][card.rank] = 0;
      }
      cache[stringifiedParams][card.rank] += 1;
    }
    return cache[stringifiedParams];
  };
})();

const matchMap = (rankMap: Record<number, number>, test: number[]) =>
  isEqual(
    Object.values(rankMap).sort((a, b) => a - b),
    test
  );

const compareIndividualCardRanks = (a: number[], b: number[]) => {
  for (let i = 0, l = a.length; i < l; i++) {
    if (a[i] > b[i]) {
      return 1;
    }
    if (a[i] < b[i]) {
      return -1;
    }
  }
  return 0;
};

export default class Ranker {
  public static isQuads = (hand: Card[]) =>
    Object.values(mapToRanks(hand)).includes(4);
  public static isBoat = (hand: Card[]) => matchMap(mapToRanks(hand), [2, 3]);
  public static isTrips = (hand: Card[]) =>
    matchMap(mapToRanks(hand), [1, 1, 3]);
  public static isTwoPair = (hand: Card[]) =>
    matchMap(mapToRanks(hand), [1, 2, 2]);
  public static isOnePair = (hand: Card[]) =>
    matchMap(mapToRanks(hand), [1, 1, 1, 2]);
  public static isNoPair = (hand: Card[]) =>
    matchMap(mapToRanks(hand), [1, 1, 1, 1, 1]);
  public static isFlush = (hand: Card[]) =>
    hand.slice(1).every((card) => card.suit === hand[0].suit);
  public static isWheel = (hand: Card[]) =>
    isEqual(
      hand.map(({ rank }) => rank).sort((a, b) => a - b),
      [2, 3, 4, 5, 14]
    );
  public static isStraight = (hand: Card[]) => {
    if (!Ranker.isNoPair(hand)) {
      return false;
    }
    if (Ranker.isWheel(hand)) {
      return true;
    }
    const sortedRanks = hand.map(({ rank }) => rank).sort((a, b) => a - b);
    return sortedRanks[4] - sortedRanks[0] === 4;
  };
  public static findHandRank = (hand: Card[]): EvaluatedHandRank => {
    if (Ranker.isNoPair(hand)) {
      const isFlush = Ranker.isFlush(hand);
      const isStraight = Ranker.isStraight(hand);
      // straight flush;

      if (isFlush && isStraight) {
        return {
          handRank: "straightflush",
          handScore: 9,
          ranks: Ranker.isWheel(hand)
            ? [5, 4, 3, 2, 14]
            : hand.map(({ rank }) => rank).sort((a, b) => b - a),
          hand,
        };
      }
      // high card
      if (!isFlush && !isStraight) {
        return {
          handRank: "highcard",
          handScore: 1,
          ranks: hand.map(({ rank }) => rank).sort((a, b) => b - a),
          hand,
        };
      }
      // flush but not straight.
      if (isFlush) {
        return {
          handRank: "flush",
          handScore: 6,
          ranks: hand.map(({ rank }) => rank).sort((a, b) => b - a),
          hand,
        };
      }
      // must be a nonflush straight.
      return {
        handRank: "straight",
        handScore: 5,
        ranks: Ranker.isWheel(hand)
          ? [5, 4, 3, 2, 14]
          : hand.map(({ rank }) => rank).sort((a, b) => b - a),
        hand,
      };
    }
    // we have to deal with two pair first, it's the most special case.
    if (Ranker.isTwoPair(hand)) {
      // sorting, the kicker must ALWAYS be in position 0, 2, or 4, so our pairs are always in positions 1 and 3;
      const sortedHand = hand.map(({ rank }) => rank).sort((a, b) => b - a);
      const kicker = sortedHand.find(
        (value) => value !== sortedHand[1] && value !== sortedHand[3]
      );
      if (typeof kicker === "undefined") {
        throw new Error("Cannot find the kicker in a two pair hand");
      }
      return {
        handRank: "twopair",
        handScore: 3,
        hand,
        ranks: [sortedHand[1], sortedHand[3], kicker],
      };
    }
    if (Ranker.isTrips(hand)) {
      const sortedHand = hand.map(({ rank }) => rank).sort((a, b) => b - a);
      // the trips must always be in position 2.
      const tripCard = sortedHand[2];
      return {
        handRank: "trips",
        handScore: 4,
        hand,
        ranks: [tripCard, ...sortedHand.filter((rank) => rank !== tripCard)],
      };
    }

    const priority: Record<string, number> = Object.entries(mapToRanks(hand)).reduce((acc, [rank, amount]) => ({...acc, [amount]: parseInt(rank, 10)}), {});

    if (Ranker.isQuads(hand)) {
      return {
        handRank: "quads",
        handScore: 8,
        hand,
        ranks: [priority[4], priority[1]],
      };
    }
    if (Ranker.isBoat(hand)) {
      return {
        handRank: "boat",
        handScore: 7,
        hand,
        ranks: [priority[3], priority[2]],
      };
    }
    if (Ranker.isOnePair(hand)) {
      const sortedHand = hand.map(({ rank }) => rank).sort((a, b) => b - a);
      return {
        handRank: "onepair",
        handScore: 2,
        hand,
        ranks: [
          priority[2],
          ...sortedHand.filter((value) => value !== priority[2]),
        ],
      };
    }
    throw new Error("Unable to rank hand.");
  };

  public static findWinningHand = (
    ...hands: Card[][]
  ): { winningRank: EvaluatedHandRank | null; winners: Card[][] } => {
    let winningRank = null;
    let winners: Card[][] = [];
    for (const hand of hands) {
      const handRank = Ranker.findHandRank(hand);

      if (winningRank === null) {
        winningRank = handRank;
        winners = [hand];
      } else if (handRank.handScore > winningRank!.handScore) {
        winningRank = handRank;
        winners = [hand];
      } else if (handRank.handScore === winningRank!.handScore) {
        let kickerCompare = compareIndividualCardRanks(
          handRank.ranks,
          winningRank!.ranks
        );
        if (kickerCompare > 0) {
          winningRank = handRank;
          winners = [hand];
        }
        if (kickerCompare === 0) {
          winners.push(hand);
        }
      }
    }
    return { winningRank, winners };
  };
}
