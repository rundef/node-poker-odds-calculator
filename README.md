# Poker Odds Calculator

[![Build Status](https://travis-ci.org/rundef/node-poker-odds-calculator.svg?branch=master)](https://travis-ci.org/rundef/node-poker-odds-calculator)
[![Coverage Status](https://coveralls.io/repos/github/rundef/node-poker-odds-calculator/badge.svg?branch=master)](https://coveralls.io/github/rundef/node-poker-odds-calculator?branch=master)
[![Latest Stable Version](https://img.shields.io/npm/v/poker-odds-calculator.svg)](https://www.npmjs.com/package/poker-odds-calculator)

A pre-flop and post-flop odds calculator for Texas Holdem.

For a live demonstration of this library in action, check out [shortdeck.gg](https://shortdeck.gg)!

## Installation

```bash
npm install poker-odds-calculator
```

## Console Usage

#### Pre-flop odds

Let's say that we want to know the odds of 3 pre-flop all-in players holding the following hands: J♥J♤ vs T♢T♤ vs A♧K♧ :

```bash
node_modules/.bin/poker-odds-calculator JhJs TdTs AcKc
```

#### Post-flop odds

Let's say that we want to know the odds of a player holding the J♢ and the Q♢ against a player with the J♥ and the J♤ on a 7♢9♢T♤ board, with 2 cards to come :

```bash
node_modules/.bin/poker-odds-calculator -b 7d9dTs JhJs JdQd
node_modules/.bin/poker-odds-calculator --board 7d9dTs7s JhJs JdQd
```
> -b denotes the board

#### Short deck
 To calculate odds for short deck, override the game variant with -g
 ```bash
node_modules/.bin/poker-odds-calculator -g short -b 7d9dTs JhJs JdQd
node_modules/.bin/poker-odds-calculator --game short --board 7d9dTs7s JhJs JdQd
```

## API Usage

Let's take the previous example, but use the API instead:

```js
import {CardGroup, OddsCalculator} from 'poker-odds-calculator';

const player1Cards = CardGroup.fromString('JhJs');
const player2Cards = CardGroup.fromString('JdQd');
const board = CardGroup.fromString('7d9dTs');

const result = OddsCalculator.calculate([player1Cards, player2Cards], board);

console.log(`Player #1 - ${player1Cards} - ${result.equities[0].getEquity()}%`);
console.log(`Player #2 - ${player2Cards} - ${result.equities[1].getEquity()}%`);
```

To use Short Deck:
```js
const result = OddsCalculator.calculate([player1Cards, player2Cards], board, 'short');
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.