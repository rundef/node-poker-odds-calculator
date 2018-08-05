/**
 * Tests for Card class
 */
import { expect } from 'chai';
import { Card, Rank, Suit } from '../src/index';

describe('Card', () => {
  describe('fromString()', () => {
    it('parses correctly', () => {
      let card: Card = Card.fromString('Jh');
      expect(card.getRank()).to.equal(Rank.JACK);
      expect(card.getSuit()).to.equal(Suit.HEART);

      card = Card.fromString('As');
      expect(card.getRank()).to.equal(Rank.ACE);
      expect(card.getSuit()).to.equal(Suit.SPADE);

      card = Card.fromString('3c');
      expect(card.getRank()).to.equal(Rank.THREE);
      expect(card.getSuit()).to.equal(Suit.CLUB);

      card = Card.fromString('Td');
      expect(card.getRank()).to.equal(Rank.TEN);
      expect(card.getSuit()).to.equal(Suit.DIAMOND);
    });

    it('throws exception', () => {
      expect(Card.fromString.bind(null, 'Jhh')).to.throw(Error, 'Invalid card: Jhh');
      expect(Card.fromString.bind(null, '1h')).to.throw(Error, 'Invalid card rank: 1');
      expect(Card.fromString.bind(null, 'Jx')).to.throw(Error, 'Invalid card suit: x');
    });
  });

  describe('toString()', () => {
    it('formats correctly', () => {
      const strings: string[] = [
        'Ac', '4d', 'Th', 'Jh', 'Qs', 'Kd', '2s'
      ];
      for (const s of strings) {
        expect(Card.fromString(s).toString()).to.equal(s);
      }
    });
  });

  describe('Rank', () => {
    it('returns default list', () => {
      const ranks: Rank = new Rank();
      const list: number[] = ranks.all();
      expect(list).to.be.length(13);
      expect(list).to.be.an.instanceof(Array);
    });
  });
});
