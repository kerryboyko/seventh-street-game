import Card from './Card'
import Ranker from './Ranker'

const sampleHands = {
  straightflush: ['AdKdQdJdTd', '9sTsJs8s7s', '2c4c5cAc3c'],
  quads: ['KdKcKhKs2s', 'As2s2c2d2h'],
  boat: ['Kd2cKhKs2s', 'As2sAc2d2h'],
  flush: ['Ad3d5d7d9d', 'AsKsQs2s3s'],
  straight: ['AdKdQcJdTd', '9hTsJs8s7s', '2c4c5hAc3c'],
  trips: ['Kd2cKhKs3s', 'As2s3c2d2h'],
  twopair: ['Kd2c3hKs2s', 'As2sAc2d9h'],
  onepair: ['AdKdJcJdTd', '7hTsJs8s7s', '2c4c3hAc3c'],
  highcard: ['Ad3d5c7d9d', 'AsKsQs2s3c'],
}

const makeHand = (str: string) => str.match(/.{1,2}/g)?.map(Card.create);

describe("Ranker", () => {
  it('correctly evaluates hands', () => {
    expect(Ranker.findHandRank(makeHand('2c4c5cAc3c') as Card[]).handRank).toBe('straightflush')
    for(const [rankName, hands] of Object.entries(sampleHands)){
      for(const hand of hands){
        const cardHand = makeHand(hand);
        expect(Ranker.findHandRank(cardHand as Card[]).handRank).toBe(rankName)
      }
    }
  })
})