#!/usr/bin/env node
/**
 * Odds Calculator CLI
 */
import * as chalk from 'chalk';
 import * as program from 'commander';
import {CardGroup, OddsCalculator} from '../index';

program
    .option('-b, --board <cards>', 'sets the board')
    .parse(process.argv);

try {
  const board: CardGroup = ((<any> program).board ? CardGroup.fromString((<any> program).board) : null);
  const cardgroups: CardGroup[] = [];

  for (const hand of (<any> program).args) {
    cardgroups.push(CardGroup.fromString(hand));
  }

  if (cardgroups.length <= 1) {
    throw new Error('You must enter at least 2 hands');
  }

  const result: OddsCalculator = OddsCalculator.calculate(cardgroups, board);
  const prepend: string = (board !== null ? '' : '~');

  if (board) {
    console.log('Board: ' + chalk.yellow(board.toString()));
    console.log('');
  }

  let mostEquityIndex:Array<number> = [];
  let mostEquity: number = 0;
  for (let i: number = 0; i < cardgroups.length; i++) {
    const curEquity: number = result.equities[i].getEquity() + result.equities[i].getTiePercentage();
    if (curEquity >= mostEquity) {
      if (curEquity > mostEquity) {
        mostEquityIndex = [i];
      } else {
        mostEquityIndex.push(i);
      }
      mostEquity = curEquity;
    }
  }

  for (let i: number = 0; i < cardgroups.length; i++) {
    const s: string = `Player #${i + 1} - ${cardgroups[i]} - ${prepend}${result.equities[i]}`;
    const func: Function = (mostEquityIndex.indexOf(i) >= 0 ? chalk.green : chalk.red);
    console.log(func(s));
  }

  if (board === null || board.length <= 3) {
    console.log('');
    console.log(`Simulated ${result.getIterationCount()} random boards in ${(result.getElapsedTime() / 1000).toFixed(1)} seconds`);
  }
} catch (err) {
  console.log(chalk.red(err.message));
}