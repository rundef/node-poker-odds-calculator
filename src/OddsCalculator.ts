/**
 * OddsCalculator
 *
 */
import * as _ from 'lodash';
import { Card, Suit } from './Card';
import { CardGroup } from './CardGroup';
import { FullDeckGame, IGame, ShortDeckGame } from './Game';
import { HandRank } from './HandRank';
export class HandEquity {
  protected possibleHandsCount: number;
  protected bestHandCount: number;
  protected tieHandCount: number;

  public constructor() {
    this.possibleHandsCount = 0;
    this.bestHandCount = 0;
    this.tieHandCount = 0;
  }

  public addPossibility(isBestHand: boolean, isTie: boolean): void {
    this.possibleHandsCount += 1;
    if (isBestHand) {
      this.bestHandCount += 1;
    } else if (isTie) {
      this.tieHandCount += 1;
    }
  }

  public getEquity(): number {
    if (this.possibleHandsCount === 0) {
      return 0;
    }
    return Math.round(this.bestHandCount * 100.0 / this.possibleHandsCount);
  }

  public getTiePercentage(): number {
    if (this.possibleHandsCount === 0) {
      return 0;
    }
    return Math.round(this.tieHandCount * 100.0 / this.possibleHandsCount);
  }

  public toString(): string {
    let s: string = `${this.getEquity()}%`;
    const tie: number = this.getTiePercentage();
    if (tie > 0) {
      s += ` (Tie: ${tie}%)`;
    }
    return s;
  }
}

export class OddsCalculator {
  public static DEFAULT_ITERATIONS: number = 100000;
  public equities: HandEquity[];
  protected odds: number[];
  protected handranks: HandRank[];
  protected iterations: number;
  protected elapsedTime: number;

  protected constructor(equities: HandEquity[], handranks: HandRank[], iterations: number, elapsedTime: number) {
    this.equities = equities;
    this.handranks = handranks;
    this.iterations = iterations;
    this.elapsedTime = elapsedTime;
  }

  public static calculate(cardgroups: CardGroup[], board?: CardGroup, gameVariant?: string, iterations?: number): OddsCalculator {
    if (board && [0, 3, 4, 5].indexOf(board.length) === -1) {
      throw new Error('The board must contain 0, 3, 4 or 5 cards');
    }

    const allGroups: CardGroup[] = board ? cardgroups.concat(board) : cardgroups;
    let allCards: Card[] = [];
    allGroups.forEach((group: CardGroup) => {
      allCards = allCards.concat(group);
    });
    // Invalid card values
    if (gameVariant === 'short') {
      allCards.forEach((card: Card) => {
        if (card.getRank() < 6) {
          throw new Error('Only cards rank 6 through A are valid.');
        }
      });
    }
    const uniqCards: Card[] = _.uniqBy(allCards, (card: Card) => {
      return card.getRank() + '-' + card.getSuit();
    });

    if (uniqCards.length !== allCards.length) {
      throw new Error('Detected duplicate cards');
    }

    iterations = iterations || 0;

    let game: IGame;

    if (gameVariant === 'short') {
      game = new ShortDeckGame();
    } else {
      game = new FullDeckGame();
    }

    let handranks: HandRank[] = [];

    // Find out which cards are left in the deck
    const remainingCards: CardGroup = new CardGroup();
    if (!board || board.length <= 4) {
      for (const suit of Suit.all()) {
        for (const rank of game.rank.all()) {
          const c: Card = new Card(rank, suit);
          let isUsed: boolean = false;

          if (board) {
            for (const boardCard of board) {
              if (c.equals(boardCard)) {
                isUsed = true;
                break;
              }
            }
          }

          if (!isUsed) {
            for (const cardgroup of cardgroups) {
              for (const card of cardgroup) {
                if (c.equals(card)) {
                  isUsed = true;
                  break;
                }
              }
              if (isUsed) {
                break;
              }
            }
          }

          if (!isUsed) {
            remainingCards.push(c);
          }
        }
      }
    }

    const remainingCount: number = remainingCards.length;

    // Figure out hand ranking
    handranks = cardgroups.map((cardgroup: CardGroup): HandRank => {
      return HandRank.evaluate(game, board ? cardgroup.concat(board) : cardgroup);
    });

    const equities: HandEquity[] = cardgroups.map((cardgroup: CardGroup): HandEquity => {
      return new HandEquity();
    });

    const selectWinners: Function = (simulatedBoard: CardGroup): void => {
      let highestRanking: HandRank = null;
      let highestRankingIndex: number[] = [];
      for (let i: number = 0; i < cardgroups.length; i += 1) {
        const handranking: HandRank = HandRank.evaluate(
          game,
          cardgroups[i].concat(simulatedBoard)
        );
        const isBetter: number = highestRanking
          ? handranking.compareTo(highestRanking)
          : -1;
        if (highestRanking === null || isBetter >= 0) {
          if (isBetter === 0) {
            highestRankingIndex.push(i);
          } else {
            highestRankingIndex = [i];
          }
          highestRanking = handranking;
        }
      }
      for (let i: number = 0; i < cardgroups.length; i += 1) {
        let isWinning: boolean = false;
        let isTie: boolean = false;

        if (highestRankingIndex.length > 1) {
          isTie = (highestRankingIndex.indexOf(i) > -1);
        } else {
          isWinning = (highestRankingIndex.indexOf(i) > -1);
        }

        equities[i].addPossibility(isWinning, isTie);
      }
    };

    const jobStartedAt: number = +new Date();
    if (!board || board.length === 0) {
      iterations = iterations || OddsCalculator.DEFAULT_ITERATIONS;

      for (let x: number = iterations; x > 0; x -= 1) {
        const index1: number = _.random(0, remainingCount - 1);
        let index2: number;
        let index3: number;
        let index4: number;
        let index5: number;

        do {
          index2 = _.random(0, remainingCount - 1);
        } while (index2 === index1);

        do {
          index3 = _.random(0, remainingCount - 1);
        } while (index3 === index1 || index3 === index2);

        do {
          index4 = _.random(0, remainingCount - 1);
        } while (index4 === index1 || index4 === index2 || index4 === index3);

        do {
          index5 = _.random(0, remainingCount - 1);
        } while (index5 === index1 || index5 === index2 || index5 === index3 || index5 === index4);

        const simulatedBoard: CardGroup = CardGroup.fromCards([
          remainingCards[index1],
          remainingCards[index2],
          remainingCards[index3],
          remainingCards[index4],
          remainingCards[index5]
        ]);

        selectWinners(simulatedBoard);
      }
    } else if (board.length >= 5) {
      iterations = 1;
      selectWinners(board);
    } else if (board.length === 4) {
      for (const c of remainingCards) {
        const simulatedBoard: CardGroup = board.concat(CardGroup.fromCards([c]));
        iterations += 1;
        selectWinners(simulatedBoard);
      }
    } else if (board.length === 3) {
      for (let a: number = 0; a < remainingCount; a += 1) {
        for (let b: number = a + 1; b < remainingCount; b += 1) {
          const simulatedBoard: CardGroup = board.concat(CardGroup.fromCards([remainingCards[a], remainingCards[b]]));
          iterations += 1;
          selectWinners(simulatedBoard);
        }
      }
    }

    const jobEndedAt: number = +new Date();
    return new OddsCalculator(equities, handranks, iterations, jobEndedAt - jobStartedAt);
  }

  public getIterationCount(): number {
    return this.iterations;
  }

  public getElapsedTime(): number {
    return this.elapsedTime;
  }

  public getHandRank(index: number): HandRank {
    return this.handranks[index];
  }
}
