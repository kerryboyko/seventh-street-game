import Card from "../Card";

import { getAllCombinations } from "./getAllCombinations";

const makeHand = (str: string): Card[] =>
  str.match(/.{1,2}/g)?.map(Card.create) as Card[];

describe("getAllCombinations", () => {
  it("gets all combinations of n elements from an array of k size", () => {
    let test = [1, 2, 3];
    expect(getAllCombinations(test, 2)).toEqual([
      [1, 2],
      [1, 3],
      [2, 3],
    ]);
  });
});

describe("getsAllCombinagtionsOfCards", () => {
  it("gets all combinations of a five card hand", () => {
    const sevenCards = makeHand("2c4c5cAc3c7h6d");
    const combos = getAllCombinations(sevenCards, 5);

    expect(combos.length).toBe(21);
    expect(combos.map((hand) => Card.cardsToText(...hand)).sort()).toEqual([
      "6d5c4c3c2c",
      "7h5c4c3c2c",
      "7h6d4c3c2c",
      "7h6d5c3c2c",
      "7h6d5c4c2c",
      "7h6d5c4c3c",
      "Ac5c4c3c2c",
      "Ac6d4c3c2c",
      "Ac6d5c3c2c",
      "Ac6d5c4c2c",
      "Ac6d5c4c3c",
      "Ac7h4c3c2c",
      "Ac7h5c3c2c",
      "Ac7h5c4c2c",
      "Ac7h5c4c3c",
      "Ac7h6d3c2c",
      "Ac7h6d4c2c",
      "Ac7h6d4c3c",
      "Ac7h6d5c2c",
      "Ac7h6d5c3c",
      "Ac7h6d5c4c",
    ]);
  });
});
