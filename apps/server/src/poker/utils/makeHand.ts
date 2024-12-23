import Card from "../Card.ts";

export const makeHand = (str: string): Card[] =>
  str.match(/.{1,2}/g)?.map(Card.create) as Card[];
