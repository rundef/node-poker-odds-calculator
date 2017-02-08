import {expect} from 'chai';
import {CardGroup, Suit, Rank} from '../src/index';

describe('CardGroup', () => {
  describe('fromString()', () => {
    it('parses correctly', () => {
      let cardgroup = CardGroup.fromString('Jh');
      expect(cardgroup.length).to.equal(1);

      expect(cardgroup[0].getRank()).to.equal(Rank.JACK);
      expect(cardgroup[0].getSuit()).to.equal(Suit.HEART);

      cardgroup = CardGroup.fromString('Jh As 3c');
      expect(cardgroup.length).to.equal(3);

      expect(cardgroup[0].getRank()).to.equal(Rank.JACK);
      expect(cardgroup[0].getSuit()).to.equal(Suit.HEART);

      expect(cardgroup[1].getRank()).to.equal(Rank.ACE);
      expect(cardgroup[1].getSuit()).to.equal(Suit.SPADE);

      expect(cardgroup[2].getRank()).to.equal(Rank.THREE);
      expect(cardgroup[2].getSuit()).to.equal(Suit.CLUB);
    });

    it('throws exception', () => {
      expect(CardGroup.fromString.bind(null, 'Jhh')).to.throw(Error, 'Invalid card group: Jhh');
    });
  });

  describe('toString()', () => {
    it('formats correctly', () => {
      const strings = [
        'Ac 4d Th', 'Jh Qs'
      ];
      for (const s of strings) {
        expect(CardGroup.fromString(s).toString()).to.equal(s);
      }
    });
  });

  describe('sort()', () => {
    it('sorts asc correctly', () => {
      const cardgroup = CardGroup.fromString('Ac 3d 5s 5h');
      cardgroup.sortCards('asc');

      expect(cardgroup[0].getRank()).to.equal(Rank.THREE);
      expect(cardgroup[0].getSuit()).to.equal(Suit.DIAMOND);

      expect(cardgroup[1].getRank()).to.equal(Rank.FIVE);

      expect(cardgroup[2].getRank()).to.equal(Rank.FIVE);

      expect(cardgroup[3].getRank()).to.equal(Rank.ACE);
      expect(cardgroup[3].getSuit()).to.equal(Suit.CLUB);
    });

    it('sorts desc correctly', () => {
      const cardgroup = CardGroup.fromString('Ac 3d 5s 5h');
      cardgroup.sortCards('desc');

      expect(cardgroup[0].getRank()).to.equal(Rank.ACE);
      expect(cardgroup[0].getSuit()).to.equal(Suit.CLUB);

      expect(cardgroup[1].getRank()).to.equal(Rank.FIVE);

      expect(cardgroup[2].getRank()).to.equal(Rank.FIVE);

      expect(cardgroup[3].getRank()).to.equal(Rank.THREE);
      expect(cardgroup[3].getSuit()).to.equal(Suit.DIAMOND);
    });
  });
});