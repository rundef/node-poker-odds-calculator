import {expect} from 'chai';
import {CardGroup, OddsCalculator} from '../src/index';

describe('OddsCalculator (ties)', () => {
  it('no board', () => {
    const player1Cards = CardGroup.fromString('AsAc');
    const player2Cards = CardGroup.fromString('AhAd');
    const result = OddsCalculator.calculate([player1Cards, player2Cards], null, 8000);

    const oddsPlayer1 = result.equities[0].getEquity();
    const oddsPlayer2 = result.equities[1].getEquity();

    const tiePlayer1 = result.equities[0].getTiePercentage();
    const tiePlayer2 = result.equities[1].getTiePercentage();

    // ~2.2 win for each
    expect(oddsPlayer1).to.be.at.least(2);
    expect(oddsPlayer1).to.be.at.most(3);

    expect(oddsPlayer2).to.be.at.least(2);
    expect(oddsPlayer2).to.be.at.most(3);

    // ~95.6 tie
    expect(tiePlayer1).to.be.at.least(95);
    expect(tiePlayer1).to.be.at.most(96);

    expect(tiePlayer2).to.be.at.least(95);
    expect(tiePlayer2).to.be.at.most(96);
  });

  it('no board #2', () => {
    const player1Cards = CardGroup.fromString('AsAc');
    const player2Cards = CardGroup.fromString('AhAd');
    const player3Cards = CardGroup.fromString('KsKc');
    const result = OddsCalculator.calculate([player1Cards, player2Cards, player3Cards], null, 8000);

    const oddsPlayer1 = result.equities[0].getEquity();
    const oddsPlayer2 = result.equities[1].getEquity();
    const oddsPlayer3 = result.equities[2].getEquity();

    const tiePlayer1 = result.equities[0].getTiePercentage();
    const tiePlayer2 = result.equities[1].getTiePercentage();
    const tiePlayer3 = result.equities[2].getTiePercentage();

    // ~1.75 to win, ~75.63 to tie
    expect(oddsPlayer1).to.be.at.least(1);
    expect(oddsPlayer1).to.be.at.most(2);

    expect(tiePlayer1).to.be.at.least(75);
    expect(tiePlayer1).to.be.at.most(77);

    // ~2.33 to win, ~75.63 to tie
    expect(oddsPlayer2).to.be.at.least(2);
    expect(oddsPlayer2).to.be.at.most(3);

    expect(tiePlayer2).to.be.at.least(75);
    expect(tiePlayer2).to.be.at.most(77);

    // ~20.29 to win, ~0.42 to tie
    expect(oddsPlayer3).to.be.at.least(20);
    expect(oddsPlayer3).to.be.at.most(21);

    expect(tiePlayer3).to.be.at.least(0);
    expect(tiePlayer3).to.be.at.most(1);
  });

  it('one card left', () => {
    let player1Cards = CardGroup.fromString('6s5s');
    let player2Cards = CardGroup.fromString('6h5h');
    let player3Cards = CardGroup.fromString('8h8d');
    let board = CardGroup.fromString('4s7s8c2c');
    let result = OddsCalculator.calculate([player1Cards, player2Cards, player3Cards], board);

    const oddsPlayer1 = result.equities[0].getEquity();
    const oddsPlayer2 = result.equities[1].getEquity();
    const oddsPlayer3 = result.equities[2].getEquity();

    const tiePlayer1 = result.equities[0].getTiePercentage();
    const tiePlayer2 = result.equities[1].getTiePercentage();
    const tiePlayer3 = result.equities[2].getTiePercentage();

    // ~30.9 to win, ~38.98 to tie
    expect(oddsPlayer1).to.be.at.least(19);
    expect(oddsPlayer1).to.be.at.most(20);

    expect(tiePlayer1).to.be.at.least(59);
    expect(tiePlayer1).to.be.at.most(60);

    // ~0 to win, ~38.98 to tie
    expect(oddsPlayer2).to.be.at.least(0);
    expect(oddsPlayer2).to.be.at.most(0);

    expect(tiePlayer2).to.be.at.least(59);
    expect(tiePlayer2).to.be.at.most(60);

    // ~30.1 to win, ~0.44 to tie
    expect(oddsPlayer3).to.be.at.least(21);
    expect(oddsPlayer3).to.be.at.most(22);

    expect(tiePlayer3).to.be.at.least(0);
    expect(tiePlayer3).to.be.at.most(0);
  });

  it('two cards left', () => {
    let player1Cards = CardGroup.fromString('6s5s');
    let player2Cards = CardGroup.fromString('6h5h');
    let player3Cards = CardGroup.fromString('8h8d');
    let board = CardGroup.fromString('4s7s8c');
    let result = OddsCalculator.calculate([player1Cards, player2Cards, player3Cards], board);

    const oddsPlayer1 = result.equities[0].getEquity();
    const oddsPlayer2 = result.equities[1].getEquity();
    const oddsPlayer3 = result.equities[2].getEquity();

    const tiePlayer1 = result.equities[0].getTiePercentage();
    const tiePlayer2 = result.equities[1].getTiePercentage();
    const tiePlayer3 = result.equities[2].getTiePercentage();

    // ~30.9 to win, ~38.98 to tie
    expect(oddsPlayer1).to.be.at.least(30);
    expect(oddsPlayer1).to.be.at.most(31);

    expect(tiePlayer1).to.be.at.least(38);
    expect(tiePlayer1).to.be.at.most(40);

    // ~0 to win, ~38.98 to tie
    expect(oddsPlayer2).to.be.at.least(0);
    expect(oddsPlayer2).to.be.at.most(0);

    expect(tiePlayer2).to.be.at.least(38);
    expect(tiePlayer2).to.be.at.most(40);

    // ~30.1 to win, ~0.44 to tie
    expect(oddsPlayer3).to.be.at.least(30);
    expect(oddsPlayer3).to.be.at.most(31);

    expect(tiePlayer3).to.be.at.least(0);
    expect(tiePlayer3).to.be.at.most(1);
  });
});
