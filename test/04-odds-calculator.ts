/**
 * Tests for OddsCalculator
 */
import { expect } from 'chai';
import * as _ from 'lodash';
import { CardGroup, HandEquity, HandRank, OddsCalculator } from '../src/index';

describe('OddsCalculator', () => {
  it('should throw exception if board has 1 or 2 cards', () => {
    const player1Cards: CardGroup = CardGroup.fromString('AcAh');
    const player2Cards: CardGroup = CardGroup.fromString('7c7h');
    let board: CardGroup = CardGroup.fromString('2d,Kd');

    expect(OddsCalculator.calculate.bind(null, [player1Cards, player2Cards], board))
      .to.throw(Error, 'The board must contain 0, 3, 4 or 5 cards');

    board = CardGroup.fromString('2d');

    expect(OddsCalculator.calculate.bind(null, [player1Cards, player2Cards], board))
      .to.throw(Error, 'The board must contain 0, 3, 4 or 5 cards');
  });

  it('should throw exception if there are duplicate card', () => {
    let player1Cards: CardGroup = CardGroup.fromString('AcAh');
    let player2Cards: CardGroup = CardGroup.fromString('AcAd');
    let board: CardGroup = CardGroup.fromString('2d,Kd,4s');

    expect(OddsCalculator.calculate.bind(null, [player1Cards, player2Cards], board))
      .to.throw(Error, 'Detected duplicate cards');

    player1Cards = CardGroup.fromString('AcAh');
    player2Cards = CardGroup.fromString('3d,4d');
    board = CardGroup.fromString('2d,Kd,Ac');

    expect(OddsCalculator.calculate.bind(null, [player1Cards, player2Cards], board))
      .to.throw(Error, 'Detected duplicate cards');

    player1Cards = CardGroup.fromString('AhAh');
    player2Cards = CardGroup.fromString('AcAd');
    board = CardGroup.fromString('2d,Kd,4s');

    expect(OddsCalculator.calculate.bind(null, [player1Cards, player2Cards], board))
      .to.throw(Error, 'Detected duplicate cards');

    player1Cards = CardGroup.fromString('3d,4d');
    player2Cards = CardGroup.fromString('JcJc');
    board = CardGroup.fromString('2d,Kd,Ac');

    expect(OddsCalculator.calculate.bind(null, [player1Cards, player2Cards], board))
      .to.throw(Error, 'Detected duplicate cards');

    player1Cards = CardGroup.fromString('AdAh');
    player2Cards = CardGroup.fromString('3d,4d');
    board = CardGroup.fromString('2d,Ac,Ac');

    expect(OddsCalculator.calculate.bind(null, [player1Cards, player2Cards], board))
      .to.throw(Error, 'Detected duplicate cards');
  });

  it('full board', () => {
    const player1Cards: CardGroup = CardGroup.fromString('5d6d');
    const player2Cards: CardGroup = CardGroup.fromString('4h4c');
    const board: CardGroup = CardGroup.fromString('3d,4d,7d,4s,Ts');
    const result: OddsCalculator = OddsCalculator.calculate([player1Cards, player2Cards], board);

    expect(result.equities[0].getEquity()).to.equal(100);
    expect(result.equities[1].getEquity()).to.equal(0);
  });

  it('flop only board', () => {
    let player1Cards: CardGroup = CardGroup.fromString('5d6d');
    let player2Cards: CardGroup = CardGroup.fromString('4h4c');
    let board: CardGroup = CardGroup.fromString('3d,4d,7d');
    let result: OddsCalculator = OddsCalculator.calculate([player1Cards, player2Cards], board);

    expect(result.equities[0].getEquity()).to.equal(100);
    expect(result.equities[1].getEquity()).to.equal(0);

    player1Cards = CardGroup.fromString('5d6d');
    player2Cards = CardGroup.fromString('4h4c');
    board = CardGroup.fromString('3d,4d,9d');
    result = OddsCalculator.calculate([player1Cards, player2Cards], board);

    expect(result.equities[0].getEquity()).to.be.within(67, 69);
    expect(result.equities[1].getEquity()).to.be.within(31, 33);
  });

  it('one card left', () => {
    let player1Cards: CardGroup = CardGroup.fromString('AsKc'); // 4 queens / 44 cards left
    let player2Cards: CardGroup = CardGroup.fromString('AdAh');
    let board: CardGroup = CardGroup.fromString('2d,Jd,Tc,4s');
    let result: OddsCalculator = OddsCalculator.calculate([player1Cards, player2Cards], board);

    expect(result.equities[0].getEquity()).to.equal(9);
    expect(result.equities[1].getEquity()).to.equal(91);

    player1Cards = CardGroup.fromString('AsKc'); // 2 queens + 3 kings + 3 aces / 44 cards left
    player2Cards = CardGroup.fromString('QcQh');
    board = CardGroup.fromString('2d,Jd,Tc,4s');
    result = OddsCalculator.calculate([player1Cards, player2Cards], board);

    expect(result.equities[0].getEquity()).to.equal(18);
    expect(result.equities[1].getEquity()).to.equal(82);

    player1Cards = CardGroup.fromString('Ad5d'); // 9 diamonds + 2 fives / 44 cards left
    player2Cards = CardGroup.fromString('AhJh');
    board = CardGroup.fromString('2d,Jd,5c,Ts');
    result = OddsCalculator.calculate([player1Cards, player2Cards], board);

    expect(result.equities[0].getEquity()).to.equal(25);
    expect(result.equities[1].getEquity()).to.equal(75);

    player1Cards = CardGroup.fromString('Kd3d');
    player2Cards = CardGroup.fromString('5c5h');
    board = CardGroup.fromString('Ad,4d,5d,5s');
    result = OddsCalculator.calculate([player1Cards, player2Cards], board);

    expect(result.equities[0].getEquity()).to.equal(2);
    expect(result.equities[1].getEquity()).to.equal(98);
  });

  it('two cards left', () => {
    let player1Cards: CardGroup = CardGroup.fromString('AsKc');
    let player2Cards: CardGroup = CardGroup.fromString('AdAh');
    let board: CardGroup = CardGroup.fromString('2d,Kd,8c');
    let result: OddsCalculator = OddsCalculator.calculate([player1Cards, player2Cards], board);

    expect(result.equities[0].getEquity()).to.equal(9);
    expect(result.equities[1].getEquity()).to.equal(91);

    player1Cards = CardGroup.fromString('Kd3d');
    player2Cards = CardGroup.fromString('5c5h');
    board = CardGroup.fromString('Ad,4d,5d');
    result = OddsCalculator.calculate([player1Cards, player2Cards], board);

    expect(result.equities[0].getEquity()).to.equal(67);
    expect(result.equities[1].getEquity()).to.equal(33);
  });

  it('no board', () => {
    const player1Cards: CardGroup = CardGroup.fromString('AcAh');
    const player2Cards: CardGroup = CardGroup.fromString('7c7h');
    const result: OddsCalculator = OddsCalculator.calculate([player1Cards, player2Cards], undefined, undefined, 10000);

    const oddsPlayer1: number = result.equities[0].getEquity();
    const oddsPlayer2: number = result.equities[1].getEquity();

    // aces are roughly a 80-20 favorite
    expect(oddsPlayer1).to.be.above(75);
    expect(oddsPlayer1).to.be.below(85);

    expect(oddsPlayer2).to.be.above(15);
    expect(oddsPlayer2).to.be.below(25);
  });

  it('public methods', () => {
    const player1Cards: CardGroup = CardGroup.fromString('AcAh');
    const player2Cards: CardGroup = CardGroup.fromString('7c7h');
    let result: OddsCalculator = OddsCalculator.calculate([player1Cards, player2Cards], undefined, undefined, 10);

    expect(result.getHandRank(1)).to.be.an.instanceof(HandRank);
    expect(result.getHandRank(0)).to.be.an.instanceof(HandRank);
    expect(result.getIterationCount()).to.be.equal(10);
    expect(result.getElapsedTime()).to.be.below(3);

    const origDefault: number = OddsCalculator.DEFAULT_ITERATIONS;
    OddsCalculator.DEFAULT_ITERATIONS = 20;
    result = OddsCalculator.calculate([player1Cards, player2Cards]);
    expect(result.getIterationCount()).to.be.equal(20);
    OddsCalculator.DEFAULT_ITERATIONS = origDefault;
  });

  it('HandEquity', () => {
    let handEquity: HandEquity = new HandEquity();
    let equity: number = handEquity.getEquity();
    let ties: number = handEquity.getTiePercentage();
    expect(equity).to.be.equal(0);
    expect(ties).to.be.equal(0);
    /**
     * 10 wins, 2 ties, 8 losses
     */
    _.times(10, () => {
      handEquity.addPossibility(true, false);
    });
    _.times(2, () => {
      handEquity.addPossibility(false, true);
    });
    _.times(8, () => {
      handEquity.addPossibility(false, false);
    });
    equity = handEquity.getEquity();
    ties = handEquity.getTiePercentage();
    expect(equity).to.be.equal(50);
    expect(ties).to.be.equal(10);
    let str: string = handEquity.toString();
    expect(str).to.be.equal('50% (Tie: 10%)');

    handEquity = new HandEquity();
    handEquity.addPossibility(true, false);
    str = handEquity.toString();
    expect(str).to.be.equal('100%');
  });
});
