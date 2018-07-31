/**
 * Tests for HandRank class
 */
import { expect } from 'chai';
import { CardGroup, FullDeckGame, HandRank, Rank } from '../src/index';

describe('HandRank', () => {
  it('detects royal flush', () => {
    const rules: FullDeckGame = new FullDeckGame();
    const board: CardGroup = CardGroup.fromString('Ad,Ah,Qd,Td,9h');
    const hand: CardGroup = CardGroup.fromString('KdJd');
    const handrank: HandRank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.ACE);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.KING);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.QUEEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.TEN);

    expect(handrank.toString()).to.equal('Royal flush');
  });

  it('detects straight flush', () => {
    const rules: FullDeckGame = new FullDeckGame();
    let board: CardGroup = CardGroup.fromString('3d,4d,7d,4s,Ts');
    let hand: CardGroup = CardGroup.fromString('5d6d');
    let handrank: HandRank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.SIX);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.THREE);

    board = CardGroup.fromString('3d4dTcAs5d');
    hand = CardGroup.fromString('6d2d');
    handrank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.SIX);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.THREE);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.TWO);

    expect(handrank.toString()).to.equal('Six high straight flush');

    board = CardGroup.fromString('4s7s8d8s2s');
    hand = CardGroup.fromString('5s6s');
    handrank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.EIGHT);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.SIX);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.FOUR);

    expect(handrank.toString()).to.equal('Eight high straight flush');
  });

  it('detects ace-low straight flush', () => {
    const rules: FullDeckGame = new FullDeckGame();
    let board: CardGroup = CardGroup.fromString('3d,4d,7s,4s,2d');
    let hand: CardGroup = CardGroup.fromString('Ad5d');
    let handrank: HandRank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.THREE);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.TWO);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.ACE);

    board = CardGroup.fromString('Ad,4d,5d,5c,2d');
    hand = CardGroup.fromString('Kd3d');
    handrank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.THREE);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.TWO);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.ACE);

    expect(handrank.toString()).to.equal('Five high straight flush');

    board = CardGroup.fromString('3s4s5s7h6d');
    hand = CardGroup.fromString('As2s');
    handrank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.THREE);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.TWO);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.ACE);

    expect(handrank.toString()).to.equal('Five high straight flush');
  });

  it('detects quads', () => {
    const rules: FullDeckGame = new FullDeckGame();
    const board: CardGroup = CardGroup.fromString('2s,4d,7d,4s,Ts');
    const hand: CardGroup = CardGroup.fromString('4h4c');
    const handrank: HandRank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.QUADS);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.TEN);

    expect(handrank.toString()).to.equal('Quad fours (T high)');
  });

  it('detects fullhouse', () => {
    const rules: FullDeckGame = new FullDeckGame();
    let board: CardGroup = CardGroup.fromString('2s,4d,7d,4s,Ts');
    let hand: CardGroup = CardGroup.fromString('ThTd');
    let handrank: HandRank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.FULL_HOUSE);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.FOUR);

    expect(handrank.toString()).to.equal('Full house: tens full of fours');

    board = CardGroup.fromString('4s7s8c4h7h');
    hand = CardGroup.fromString('8h8d');
    handrank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.FULL_HOUSE);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.EIGHT);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.EIGHT);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.EIGHT);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.SEVEN);

    expect(handrank.toString()).to.equal('Full house: eights full of sevens');

    board = CardGroup.fromString('4s7s8c7d7h');
    hand = CardGroup.fromString('8h8d');
    handrank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.FULL_HOUSE);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.EIGHT);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.EIGHT);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.EIGHT);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.SEVEN);

    expect(handrank.toString()).to.equal('Full house: eights full of sevens');
  });

  it('detects flush', () => {
    const rules: FullDeckGame = new FullDeckGame();
    let board: CardGroup = CardGroup.fromString('2d,7d,Ts,9d,Th');
    let hand: CardGroup = CardGroup.fromString('JdQd');
    let handrank: HandRank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.QUEEN);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.NINE);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.TWO);

    expect(handrank.toString()).to.equal('Queen high flush');

    board = CardGroup.fromString('4s7s8c2c2s');
    hand = CardGroup.fromString('5s6s');
    handrank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.SIX);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.TWO);

    expect(handrank.toString()).to.equal('Seven high flush');

    board = CardGroup.fromString('3s4s5c8s6d');
    hand = CardGroup.fromString('As2s');
    handrank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.FLUSH);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.ACE);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.EIGHT);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.THREE);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.TWO);

    expect(handrank.toString()).to.equal('Ace high flush');
  });

  it('detects straight', () => {
    const rules: FullDeckGame = new FullDeckGame();
    let board: CardGroup = CardGroup.fromString('2d,7d,Ts,9d,Th');
    let hand: CardGroup = CardGroup.fromString('8s6h');
    let handrank: HandRank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.STRAIGHT);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.NINE);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.EIGHT);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.SIX);

    board = CardGroup.fromString('3d4sTcAs5s');
    hand = CardGroup.fromString('6s2d');
    handrank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.STRAIGHT);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.SIX);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.THREE);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.TWO);

    expect(handrank.toString()).to.equal('Six high straight');
  });

  it('detects ace-low straight', () => {
    const rules: FullDeckGame = new FullDeckGame();
    const board: CardGroup = CardGroup.fromString('3d4s9s7s5s');
    const hand: CardGroup = CardGroup.fromString('Ad2d');
    const handrank: HandRank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.STRAIGHT);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.FIVE);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.FOUR);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.THREE);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.TWO);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.ACE);

    expect(handrank.toString()).to.equal('Five high straight');
  });

  it('detects trips', () => {
    const rules: FullDeckGame = new FullDeckGame();
    const board: CardGroup = CardGroup.fromString('2d,7d,Ts,9d,Th');
    const hand: CardGroup = CardGroup.fromString('TcJc');
    const handrank: HandRank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.TRIPS);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.NINE);

    expect(handrank.toString()).to.equal('Trip tens (J,9 high)');
  });

  it('detects two pairs', () => {
    const rules: FullDeckGame = new FullDeckGame();
    let board: CardGroup = CardGroup.fromString('2d,7d,Ts,9d,Jh');
    let hand: CardGroup = CardGroup.fromString('TcJc');
    let handrank: HandRank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.TWO_PAIRS);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.NINE);

    board = CardGroup.fromString('2d,7d,7s,Jh');
    hand = CardGroup.fromString('AcJc');
    handrank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.TWO_PAIRS);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.ACE);

    expect(handrank.toString()).to.equal('Two pairs: jacks and sevens (A high)');

    // double paired board
    board = CardGroup.fromString('5h,5s,7c,6c,7d');
    hand = CardGroup.fromString('JdJc');
    handrank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.TWO_PAIRS);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.SEVEN);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.SIX);

    expect(handrank.toString()).to.equal('Two pairs: jacks and sevens (6 high)');
  });

  it('detects pair', () => {
    const rules: FullDeckGame = new FullDeckGame();
    const board: CardGroup = CardGroup.fromString('2d,7d,Ts,9d,6s');
    let hand: CardGroup = CardGroup.fromString('TcJc');
    let handrank: HandRank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.PAIR);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.NINE);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.SEVEN);

    hand = CardGroup.fromString('JdJh');
    handrank = HandRank.evaluate(rules, hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.PAIR);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.TEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.NINE);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.SEVEN);

    expect(handrank.toString()).to.equal('Pair of jacks (T,9,7 high)');
  });

  it('detects high card', () => {
    const rules: FullDeckGame = new FullDeckGame();
    const board: CardGroup = CardGroup.fromString('2c,4c,Jd,9d,6d');
    const hand: CardGroup = CardGroup.fromString('KcQc');
    const handrank: HandRank = HandRank.evaluate(rules, <CardGroup> hand.concat(board));

    expect(handrank.getRank()).to.equal(rules.HIGH_CARD);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(Rank.KING);
    expect(handrank.getHighCards()[1].getRank()).to.equal(Rank.QUEEN);
    expect(handrank.getHighCards()[2].getRank()).to.equal(Rank.JACK);
    expect(handrank.getHighCards()[3].getRank()).to.equal(Rank.NINE);
    expect(handrank.getHighCards()[4].getRank()).to.equal(Rank.SIX);

    expect(handrank.toString()).to.equal('High card (K,Q,J,9,6 high)');
  });
});
