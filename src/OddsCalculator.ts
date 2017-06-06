import {Card, Suit, Rank} from './Card';
import {CardGroup} from './CardGroup';
import {HandRank} from './HandRank';
import * as _ from 'lodash';

class HandEquity {
  protected possibleHandsCount: number;
  protected bestHandCount: number;

  public constructor() {
    this.possibleHandsCount = 0;
    this.bestHandCount = 0;
  }

  public addPossibility(isBestHand: boolean): void {
    this.possibleHandsCount++;
    if (isBestHand) {
      this.bestHandCount++;
    }
  }

  public getEquity(): number {
    if (this.possibleHandsCount === 0) {
      return 0;
    }
    return Math.round(this.bestHandCount * 100.0 / this.possibleHandsCount);
  }
}

export class OddsCalculator {
  protected odds: number[];
  protected handranks: HandRank[];
  protected iterations: number;
  protected elapsedTime: number;

  protected constructor(odds: number[], handranks: HandRank[], iterations: number, elapsedTime: number) {
    this.odds = odds;
    this.handranks = handranks;
    this.iterations = iterations;
    this.elapsedTime = elapsedTime;
  }

  public getIterationCount(): number {
    return this.iterations;
  }

  public getElapsedTime(): number {
    return this.elapsedTime;
  }

  public static calculate(cardgroups: CardGroup[], board?: CardGroup, iterations?: number): OddsCalculator {
    if (board && [0, 3, 4, 5].indexOf(board.length) === -1) {
      throw new Error('The board must contain 0, 3, 4 or 5 cards');
    }

    // Detect duplicate cards
    for (let i = 0; i < cardgroups.length; i++) {
      for (let j = i + 1; j < cardgroups.length; j++) {
        for (const card of cardgroups[j]) {
          if (cardgroups[i].contains(card)) {
            throw new Error('Detected duplicate cards');
          }
        }
      }
    }
    if (board && board.length) {
      for (let i = 0; i < cardgroups.length; i++) {
        for (const card of cardgroups[i]) {
          if (board.contains(card)) {
            throw new Error('Detected duplicate cards');
          }
        }
      }
    }
    iterations = iterations || 0;

    let odds: number[] = [];
    let handranks: HandRank[] = [];

    // Find out which cards are left in the deck
    let remainingCards = new CardGroup();
    if (!board || board.length <= 4) {
      for (const suit of Suit.all()) {
        for (const rank of Rank.all()) {
          const c = new Card(rank, suit);
          let isUsed = false;

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

    const remainingCount = remainingCards.length;

    // Figure out hand ranking
    handranks = cardgroups.map((cardgroup: CardGroup): HandRank => {
      return HandRank.evaluate(board ? cardgroup.concat(board) : cardgroup);
    });

    const equities: HandEquity[] = cardgroups.map((cardgroup: CardGroup): HandEquity => {
      return new HandEquity();
    });

    function selectWinners(simulatedBoard: CardGroup) {
      let highestRanking: HandRank = null;
      let highestRankingIndex:Array<number> = [];
      for (let i = 0; i < cardgroups.length; i++) {
        const handranking = HandRank.evaluate(
          cardgroups[i].concat(simulatedBoard)
        );
        let isBetter = highestRanking
          ? handranking.compareTo(highestRanking)
          : -1;
        if (highestRanking === null || isBetter >= 0) {
          if (isBetter == 0) highestRankingIndex.push(i);
          else highestRankingIndex = [i];
          highestRanking = handranking;
        }
      }
      for (let i = 0; i < cardgroups.length; i++) {
        equities[i].addPossibility(highestRankingIndex.indexOf(i) > -1);
      }
    }

    const jobStartedAt = +new Date();
    if (!board || board.length === 0) {
      iterations = iterations || 100000;

      for (let x = iterations; x > 0; x--) {
        const index1 = _.random(0, remainingCount - 1);
        let index2: number, index3: number, index4: number, index5: number;

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

        const simulatedBoard = CardGroup.fromCards([
          remainingCards[index1],
          remainingCards[index2],
          remainingCards[index3],
          remainingCards[index4],
          remainingCards[index5]
        ]);

        selectWinners(simulatedBoard);
      }
      /*
      LOOP  
      

        HandRanking highestRanking = null;
        int highestRankingIndex = -1;

        for(int z = 0; z < handsCount; z++) {
          Hand h = mHands.get(z);
          HandRanking hr = HandRanking.evaluate(h.getCard(0), h.getCard(1), mBoardCards.get(0), mBoardCards.get(1), mBoardCards.get(2), mBoardCards.get(3), mBoardCards.get(4));

          if(highestRanking == null || hr.compareTo(highestRanking) >= 0) {
            highestRankingIndex = z;
            highestRanking = hr;
          }
        }

        for(int z = 0; z < handsCount; z++) {
          mEquities.get(z).addPossibleHand(z == highestRankingIndex);
        }
      }

      mBoardCards.clear();
      */
    } else if (board.length >= 5) {
      iterations = 1;
      selectWinners(board)
    } else if (board.length === 4) {
      for (const c of remainingCards) {
        const simulatedBoard = board.concat(CardGroup.fromCards([c]));
        iterations++;
        selectWinners(simulatedBoard)
      }
    } else if (board.length === 3) {
      for (let a = 0; a < remainingCount; a++) {
        for (let b = a + 1; b < remainingCount; b++) {
          let highestRanking: HandRank = null;
          let highestRankingIndex = -1;

          const simulatedBoard = board.concat(CardGroup.fromCards([remainingCards[a], remainingCards[b]]));
          iterations++;
          selectWinners(simulatedBoard);
        }
      }
    }

    if (odds.length === 0) {
      odds = equities.map((e: HandEquity): number => {
        return e.getEquity();
      });
    }

    const jobEndedAt = +new Date();
    return new OddsCalculator(odds, handranks, iterations, jobEndedAt - jobStartedAt);
  }

  public getOdds(index: number): number {
    return this.odds[index];
  }

  public getHandRank(index: number): HandRank {
    return this.handranks[index];
  }
}
