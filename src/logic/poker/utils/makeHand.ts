import Card from "../Card";

export const makeHand = (str: string): Card[] =>
  str.match(/.{1,2}/g)?.map(Card.create) as Card[];
