import {expect} from 'chai';
import {HandRank, CardGroup, Rank} from '../src/index';

describe('HandRank', () => {
  it('detects royal flush', () => {
    let board = CardGroup.fromString('Ad,Ah,Qd,Td,9h');
    let hand = CardGroup.fromString('KdJd');
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.ACE);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.KING);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.QUEEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.TEN);

    expect(handrank.toString()).to.equal('Royal flush');
  });

  it('detects straight flush', () => {
    let board = CardGroup.fromString('3d,4d,7d,4s,Ts');
    let hand = CardGroup.fromString('5d6d');
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.SIX);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.THREE);

    board = CardGroup.fromString('3d4dTcAs5d');
    hand = CardGroup.fromString('6d2d');
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.SIX);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.THREE);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.TWO);

    expect(handrank.toString()).to.equal('Six high straight flush');
  });

  it('detects ace-low straight flush', () => {
    let board = CardGroup.fromString('3d,4d,7s,4s,2d');
    let hand = CardGroup.fromString('Ad5d');
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.THREE);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.TWO);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.ACE);

    board = CardGroup.fromString('Ad,4d,5d,5c,2d');
    hand = CardGroup.fromString('Kd3d');
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.THREE);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.TWO);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.ACE);

    expect(handrank.toString()).to.equal('Five high straight flush');
  });

  it('detects quads', () => {
    let board = CardGroup.fromString('2s,4d,7d,4s,Ts');
    let hand = CardGroup.fromString('4h4c');
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.QUADS);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.TEN);

    expect(handrank.toString()).to.equal('Quad fours (T high)');
  });

  it('detects fullhouse', () => {
    let board = CardGroup.fromString('2s,4d,7d,4s,Ts');
    let hand = CardGroup.fromString('ThTd');
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.FULL_HOUSE);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.FOUR);

    expect(handrank.toString()).to.equal('Full house: tens full of fours');
  });

  it('detects flush', () => {
    let board = CardGroup.fromString('2d,7d,Ts,9d,Th');
    let hand = CardGroup.fromString('JdQd');
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.QUEEN);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.NINE);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.TWO);

    expect(handrank.toString()).to.equal('Queen high flush');
  });

  it('detects straight', () => {
    let board = CardGroup.fromString('2d,7d,Ts,9d,Th');
    let hand = CardGroup.fromString('8s6h');
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.NINE);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.EIGHT);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.SIX);

    board = CardGroup.fromString('3d4sTcAs5s');
    hand = CardGroup.fromString('6s2d');
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.SIX);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.THREE);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.TWO);

    expect(handrank.toString()).to.equal('Six high straight');
  });

  it('detects ace-low straight', () => {
    let board = CardGroup.fromString('3d4s9s7s5s');
    let hand = CardGroup.fromString('Ad2d');
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.THREE);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.TWO);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.ACE);

    expect(handrank.toString()).to.equal('Five high straight');
  });

  it('detects trips', () => {
    let board = CardGroup.fromString('2d,7d,Ts,9d,Th');
    let hand = CardGroup.fromString('TcJc');
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.TRIPS);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.NINE);

    expect(handrank.toString()).to.equal('Trip tens (J,9 high)');
  });

  it('detects two pairs', () => {
    let board = CardGroup.fromString('2d,7d,Ts,9d,Jh');
    let hand = CardGroup.fromString('TcJc');
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.TWO_PAIRS);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.NINE);

    board = CardGroup.fromString('2d,7d,7s,Jh');
    hand = CardGroup.fromString('AcJc');
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.TWO_PAIRS);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.ACE);

    expect(handrank.toString()).to.equal('Two pairs: jacks and sevens (A high)');
  });

  it('detects pair', () => {
    let board = CardGroup.fromString('2d,7d,Ts,9d,6s');
    let hand = CardGroup.fromString('TcJc');
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.PAIR);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.NINE);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.SEVEN);

    hand = CardGroup.fromString('JdJh');
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.PAIR);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.NINE);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.SEVEN);

    expect(handrank.toString()).to.equal('Pair of jacks (T,9,7 high)');
  });

  it('detects high card', () => {
    let board = CardGroup.fromString('2c,4c,Jd,9d,6d');
    let hand = CardGroup.fromString('KcQc');
    let handrank = HandRank.evaluate(<CardGroup> hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.HIGH_CARD);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.KING);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.QUEEN);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.NINE);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.SIX);

    expect(handrank.toString()).to.equal('High card (K,Q,J,9,6 high)');
  });
});