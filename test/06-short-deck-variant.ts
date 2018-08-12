/**
 * Odds Calculator Tests
 * (Focus on Short Deck Specifics)
 */
import { expect } from 'chai';
import { CardGroup, HandEquity, HandRank,
         OddsCalculator, ShortDeckGame, ShortDeckRank } from '../src';

describe('OddsCalculator: short-deck', () => {
  it('no board', () => {
    const player1Cards: CardGroup = CardGroup.fromString('AcAh');
    const player2Cards: CardGroup = CardGroup.fromString('JdTd');
    const result: OddsCalculator = OddsCalculator.calculate([player1Cards, player2Cards], undefined, 'short', 10000);

    const oddsPlayer1: number = result.equities[0].getEquity();
    const oddsPlayer2: number = result.equities[1].getEquity();

    expect(oddsPlayer1).to.be.within(61, 67);
    expect(oddsPlayer2).to.be.within(34, 38);
  });

  it('calculates proper odds', () => {
    /**
     * AhQd v JsTs on 9s9h8c should be 35%~ 63%~  w/ 2~% tie
     */
    const player1Cards: CardGroup = CardGroup.fromString('AhQd');
    const player2Cards: CardGroup = CardGroup.fromString('JsTs');
    let board: CardGroup = CardGroup.fromString('9s9h8c');
    let result: OddsCalculator = OddsCalculator.calculate([player1Cards, player2Cards], board, 'short', 10000);

    let p1Equity: HandEquity = result.equities[0];
    let p2Equity: HandEquity = result.equities[1];

    expect(p1Equity.getEquity()).to.be.equal(35);
    expect(p1Equity.getTiePercentage()).to.be.equal(2);
    expect(p2Equity.getEquity()).to.be.equal(63);
    expect(p2Equity.getTiePercentage()).to.be.equal(2);

    /**
     * 8s turn:
     * JsTs 46%~
     * AhQd 39%~
     * Tie: 14%~
     */
    board = CardGroup.fromString('9s9h8c8s');
    result = OddsCalculator.calculate([player1Cards, player2Cards], board, 'short', 500);

    p1Equity = result.equities[0];
    p2Equity = result.equities[1];

    expect(p1Equity.getEquity()).to.be.equal(29);
    expect(p1Equity.getTiePercentage()).to.be.equal(14);
    expect(p2Equity.getEquity()).to.be.equal(57);
    expect(p2Equity.getTiePercentage()).to.be.equal(14);
  });

  it('flush beats fullhouse', () => {
    const player1Cards: CardGroup = CardGroup.fromString('7d6d');
    const player2Cards: CardGroup = CardGroup.fromString('KhKc');
    const board: CardGroup = CardGroup.fromString('Kd9dAdTsAs');
    const result: OddsCalculator = OddsCalculator.calculate([player1Cards, player2Cards], board, 'short', 1);

    const oddsPlayer1: number = result.equities[0].getEquity();
    const oddsPlayer2: number = result.equities[1].getEquity();
    expect(oddsPlayer1).to.be.equal(100);
    expect(oddsPlayer2).to.be.equal(0);
  });

  it('a-6-7-8-9 is a straight', () => {
    const game: ShortDeckGame = new ShortDeckGame();
    const playerCards: CardGroup = CardGroup.fromString('7d6d');
    const board: CardGroup = CardGroup.fromString('8d9cAdJsAs');
    const handrank: HandRank = HandRank.evaluate(game, playerCards.concat(board));
    expect(handrank.getRank()).to.be.equal(game.STRAIGHT);
    expect(handrank.getHighCards().length).to.equal(5);
    expect(handrank.getHighCards()[0].getRank()).to.equal(ShortDeckRank.NINE);
    expect(handrank.getHighCards()[1].getRank()).to.equal(ShortDeckRank.EIGHT);
    expect(handrank.getHighCards()[2].getRank()).to.equal(ShortDeckRank.SEVEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(ShortDeckRank.SIX);
    expect(handrank.getHighCards()[4].getRank()).to.equal(ShortDeckRank.ACE);

  });

  it('ad-6d-7d-8d-9d is a straight flush', () => {
    const game: ShortDeckGame = new ShortDeckGame();
    const playerCards: CardGroup = CardGroup.fromString('7d6d');
    const board: CardGroup = CardGroup.fromString('8d9dAdTsAs');
    const handrank: HandRank = HandRank.evaluate(game, playerCards.concat(board));
    expect(handrank.getRank()).to.be.equal(game.STRAIGHT_FLUSH);
    expect(handrank.getHighCards()[0].getRank()).to.equal(ShortDeckRank.NINE);
    expect(handrank.getHighCards()[1].getRank()).to.equal(ShortDeckRank.EIGHT);
    expect(handrank.getHighCards()[2].getRank()).to.equal(ShortDeckRank.SEVEN);
    expect(handrank.getHighCards()[3].getRank()).to.equal(ShortDeckRank.SIX);
    expect(handrank.getHighCards()[4].getRank()).to.equal(ShortDeckRank.ACE);
  });

  it('throws error when card lower than 6 given', () => {
    let player1Cards: CardGroup = CardGroup.fromString('AcAh');
    let player2Cards: CardGroup = CardGroup.fromString('Jd5d');

    expect(OddsCalculator.calculate.bind(null, [player1Cards, player2Cards], null, 'short'))
      .to.throw(Error, 'Only cards rank 6 through A are valid');

    player1Cards = CardGroup.fromString('KsQs');
    player2Cards = CardGroup.fromString('AdTd');
    const board: CardGroup = CardGroup.fromString('JsTs5c');

    expect(OddsCalculator.calculate.bind(null, [player1Cards, player2Cards], board, 'short'))
      .to.throw(Error, 'Only cards rank 6 through A are valid');
  });

  it('deck only has 6 thru A', () => {
    const game: ShortDeckGame = new ShortDeckGame();
    const expected: number[] = [6, 7, 8, 9, 10, 11, 12, 13, 14];
    game.rank.all()
         .forEach((rank: number, i: number) => expect(rank).to.equal(expected[i]));
  });
});
