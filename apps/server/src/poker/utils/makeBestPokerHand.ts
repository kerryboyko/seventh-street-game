import Card from "../Card";
import Ranker from "../Ranker";
import { getAllCombinations } from "./getAllCombinations";

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
