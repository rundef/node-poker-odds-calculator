#!/usr/bin/env node
import * as program from 'commander';
import {CardGroup, OddsCalculator} from '../index';
import * as chalk from 'chalk';

program
    .option('-b, --board <cards>', 'sets the board')
    .parse(process.argv);

// @todo: validate input format
// @todo: validate that at least 2 hands were entered

const board: CardGroup = ((<any> program).board ? CardGroup.fromString((<any> program).board) : null);
const cardgroups: CardGroup[] = [];

for (const hand of (<any> program).args) {
  cardgroups.push(CardGroup.fromString(hand));
}

const result = OddsCalculator.calculate(cardgroups, board);
const prepend = (board !== null ? '' : '~');

if (board) {
  console.log('Board: ' + chalk.yellow(board.toString()));
  console.log('');
}

let mostEquityIndex = 0;
let mostEquity = 0;
for (let i = 0; i < cardgroups.length; i++) {
  if (result.getOdds(i) >= mostEquity) {
    mostEquityIndex = i;
    mostEquity = result.getOdds(i);
  }
}

for (let i = 0; i < cardgroups.length; i++) {
  const s = `Player #${i + 1} - ${cardgroups[i]} - ${prepend}${result.getOdds(i)}%`;
  const func = (i === mostEquityIndex ? chalk.green : chalk.red);
  console.log(func(s));
}

if (board === null || board.length <= 3) {
  console.log('');
  console.log(`Simulated ${result.getIterationCount()} random boards in ${(result.getElapsedTime() / 1000).toFixed(1)} seconds`);
}
