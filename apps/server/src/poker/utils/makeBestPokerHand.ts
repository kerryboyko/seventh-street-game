import Card from "../Card.ts";
import Ranker from "../Ranker.ts";
import { getAllCombinations } from "./getAllCombinations.ts";

export const makeBestPokerHand = (hand: Card[]) => {
  if (hand.length < 5) {
    throw new Error(
      `A poker hand must have five cards. Your hand has ${hand.length} cards`
    );
  }
  const combos = getAllCombinations(hand, 5);
  const winner = Ranker.findWinningHand(...combos)
  return winner;
};
