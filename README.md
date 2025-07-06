# ♠️♥️ Poker Odds Calculator ♣️♦️

[![CI](https://github.com/rundef/node-poker-odds-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/rundef/node-poker-odds-calculator/actions/workflows/ci.yml)
[![Latest Stable Version](https://img.shields.io/npm/v/poker-odds-calculator)](https://www.npmjs.com/package/poker-odds-calculator)

> An easy-to-use pre-flop & post-flop odds calculator for Texas Hold'em and Short Deck Hold'em (6+)

## ✨ Features

- ♠️ Texas Hold’em and Short Deck Hold’em support
- ⚡ Fast odds calculation (CLI & API)
- 🎲 Calculate equity for any number of hands
- 🧑‍💻 Node.js & TypeScript ready
- 🧪 100% tested, production ready

## 📦 Installation

```bash
npm install poker-odds-calculator
```

## 🖥️ CLI Usage

### Pre-Flop Odds

Let's say we want to know the odds for these 3 hands: J♥J♠ vs T♦T♠ vs A♣K♣:

```bash
npx poker-odds-calculator JhJs TdTs AcKc
```

#### Post-Flop Odds

On a 7♦9♦T♠ board (with 2 cards to come), with two hands:

```bash
npx poker-odds-calculator -b 7d9dTs JhJs JdQd
npx poker-odds-calculator --board 7d9dTs7s JhJs JdQd
```
> -b denotes the board

#### Short Deck

To calculate odds using the short deck (6+) rules, override the game variant with -g/--game:

 ```bash
npx poker-odds-calculator -g short -b 7d9dTs JhJs JdQd
npx poker-odds-calculator --game short --board 7d9dTs7s JhJs JdQd
```

## 🛠️ API Usage

Calculate odds programmatically in TypeScript/Node:

```js
import {CardGroup, OddsCalculator} from 'poker-odds-calculator';

const player1Cards = CardGroup.fromString('JhJs');
const player2Cards = CardGroup.fromString('JdQd');
const board = CardGroup.fromString('7d9dTs');

const result = OddsCalculator.calculate([player1Cards, player2Cards], board);

console.log(`Player #1 - ${player1Cards} - ${result.equities[0].getEquity()}%`);
console.log(`Player #2 - ${player2Cards} - ${result.equities[1].getEquity()}%`);
```

For Short Deck odds:

```js
const result = OddsCalculator.calculate([player1Cards, player2Cards], board, 'short');
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.