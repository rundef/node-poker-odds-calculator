/**
 * HandRank
 */
import * as _ from 'lodash';
import { Card, Rank } from './Card';
import { CardGroup } from './CardGroup';
import { IGame } from './Game';

export class HandRankAlias {
  public static HIGH_CARD: string = 'HIGH_CARD';
  public static PAIR: string = 'PAIR';
  public static TWO_PAIRS: string = 'TWO_PAIRS';
  public static TRIPS: string = 'TRIPS';
  public static STRAIGHT: string = 'STRAIGHT';
  public static FLUSH: string = 'FLUSH';
  public static FULL_HOUSE: string = 'FULL_HOUSE';
  public static QUADS: string = 'QUADS';
  public static STRAIGHT_FLUSH: string = 'STRAIGHT_FLUSH';
}

export class HandRank {
  protected alias: string;
  protected rank: number;
  protected highcards: Card[];

  protected constructor(rank: number, alias: string, highcards: Card[]) {
    this.rank = rank;
    this.alias = alias;
    this.highcards = highcards;
  }

  public static evaluate(game: IGame, cardgroup: CardGroup): HandRank {
    cardgroup.sortCards('desc');

    // Group card by ranks
    const countByRanks: {[x: string]: number} = cardgroup.countBy('rank');
    const quadRanks: number[] = [];
    const tripRanks: number[] = [];
    const pairRanks: number[] = [];
    let straightCardsCount: number = 0;
    let straightMaxCardRank: number = 0;
    let straightLastCardRank: number = 0;
    const allRanks: string[] = Object.keys(countByRanks).reverse();
    for (const rank of allRanks) {
      if (countByRanks[rank] === 2) {
        pairRanks.push(Number(rank));
      } else if (countByRanks[rank] === 3) {
        tripRanks.push(Number(rank));
      } else if (countByRanks[rank] === 4) {
        quadRanks.push(Number(rank));
      }

      if (straightCardsCount !== 5) {
        if (straightLastCardRank === 0 || straightLastCardRank - 1 !== Number(rank)) {
          straightMaxCardRank = straightLastCardRank = Number(rank);
          straightCardsCount = 1;
        } else {
          straightCardsCount += 1;
          straightLastCardRank = Number(rank);
        }
      }
    }

    // Group card by suit
    const countBySuits: {[x: string]: number} = cardgroup.countBy('suit');
    let flushSuit: number = 0;
    _.some(Object.keys(countBySuits), (suit: number) => {
      if (countBySuits[suit] >= 5) {
        flushSuit = Number(suit);
        return true;
      }
      return false;
    });

    // Straight flush
    if (flushSuit > 0) {
      if (straightCardsCount >= 5) {
        const straightFlushCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
          return card.getSuit() === flushSuit && card.getRank() <= straightMaxCardRank;
        });
        if (straightFlushCards.length >= 5) {
          let isStraightFlush: boolean = true;
          for (let i: number = 1; i <= 4; i += 1) {
            if (straightFlushCards[i].getRank() !== straightFlushCards[i - 1].getRank() - 1) {
              isStraightFlush = false;
              break;
            }
          }

          if (isStraightFlush) {
            return new HandRank(game.STRAIGHT_FLUSH, HandRankAlias.STRAIGHT_FLUSH, straightFlushCards.slice(0, 5));
          }
        } else if (straightFlushCards.length === 4 &&
          (
            // Five high straight (5-4-3-2-A)
            (game.A2345_STRAIGHT &&  straightFlushCards[0].getRank() === Rank.FIVE) ||
            // Five high straight (9-8-7-6-A)
            (game.A6789_STRAIGHT &&  straightFlushCards[0].getRank() === Rank.NINE)
          )
        ) {
          const aceCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
            return card.getSuit() === flushSuit && card.getRank() === Rank.ACE;
          });

          if (aceCards.length) {
            return new HandRank(game.STRAIGHT_FLUSH, HandRankAlias.STRAIGHT_FLUSH, straightFlushCards.concat(aceCards[0]));
          }
        }
      } else if (straightCardsCount === 4 &&
        (
          // Five high straight (5-4-3-2-A)
          (game.A2345_STRAIGHT && straightMaxCardRank === Rank.FIVE) ||
          // Nine high straight (9-8-7-6-A)
          (game.A6789_STRAIGHT && straightMaxCardRank === Rank.NINE)
        )
      ) {
        const aceCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
          return card.getSuit() === flushSuit && card.getRank() === Rank.ACE;
        });
        if (aceCards.length > 0) {
          const straightFlushCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
            return card.getSuit() === flushSuit && card.getRank() <= straightMaxCardRank;
          });
          if (straightFlushCards.length === 4) {
            return new HandRank(game.STRAIGHT_FLUSH, HandRankAlias.STRAIGHT_FLUSH, straightFlushCards.concat(aceCards[0]).slice(0, 5));
          }
        }
      }
    }

    // Quads
    if (quadRanks.length === 1) {
      const quadCards: Card[] = _.filter(cardgroup, (card: Card) => card.getRank() === quadRanks[0]);
      const cards: Card[] = _.reject(cardgroup, (card: Card) => card.getRank() === quadRanks[0]);
      return new HandRank(game.QUADS, HandRankAlias.QUADS, quadCards.concat(cards).slice(0, 5));
    }

    // Full house
    if (tripRanks.length === 1 && pairRanks.length >= 1) {
      const tripCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
        return card.getRank() === tripRanks[0];
      });
      const pairCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
        return card.getRank() === pairRanks[0];
      });
      return new HandRank(game.FULL_HOUSE, HandRankAlias.FULL_HOUSE, tripCards.concat(pairCards));
    } else if (tripRanks.length > 1) {
      const tripCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
        return card.getRank() === tripRanks[0];
      });
      const pairCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
        return card.getRank() === tripRanks[1];
      });
      return new HandRank(game.FULL_HOUSE, HandRankAlias.FULL_HOUSE, tripCards.concat(pairCards.slice(0, 2)));
    }

    // Flush
    if (flushSuit > 0) {
      const flushCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
        return card.getSuit() === flushSuit;
      });
      return new HandRank(game.FLUSH, HandRankAlias.FLUSH, flushCards.slice(0, 5));
    }

    // Straight
    if (straightCardsCount === 5) {
      const straightCards: Card[] = _.uniqWith(
        _.filter(cardgroup, (card: Card): boolean => {
          return card.getRank() <= straightMaxCardRank;
        }),
        (c1: Card, c2: Card): boolean => {
          return c1.getRank() === c2.getRank();
        }
      );
      return new HandRank(game.STRAIGHT, HandRankAlias.STRAIGHT, straightCards.slice(0, 5));
    } else if (straightCardsCount === 4 &&
      (
        // Five high straight (5-4-3-2-A)
        (game.A2345_STRAIGHT && straightMaxCardRank === Rank.FIVE) ||
        // Five high straight (9-8-7-6-A)
        (game.A6789_STRAIGHT && straightMaxCardRank === Rank.NINE)
      )
      ) {
      const aceCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
        return card.getRank() === Rank.ACE;
      });
      if (aceCards.length > 0) {
        const straightCards: Card[] = _.uniqWith(
          _.filter(cardgroup, (card: Card): boolean => {
            return card.getRank() <= straightMaxCardRank;
          }),
          (c1: Card, c2: Card): boolean => {
            return c1.getRank() === c2.getRank();
          }
        );
        return new HandRank(game.STRAIGHT, HandRankAlias.STRAIGHT, straightCards.concat(aceCards[0]).slice(0, 5));
      }
    }

    // Trips
    if (tripRanks.length === 1) {
      const tripCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
        return card.getRank() === tripRanks[0];
      });
      const cards: Card[] = _.reject(cardgroup, (card: Card): boolean => {
        return card.getRank() === tripRanks[0];
      });
      return new HandRank(game.TRIPS, HandRankAlias.TRIPS, tripCards.concat(cards).slice(0, 5));
    }

    // Two pairs
    if (pairRanks.length >= 2) {
      const pairedHigherCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
        return card.getRank() === pairRanks[0];
      });
      const pairedLowerCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
        return card.getRank() === pairRanks[1];
      });
      const unpairedCards: Card[] = _.reject(
        _.reject(
          cardgroup,
          (card: Card) => card.getRank() === pairRanks[0]),
        (card: Card) => card.getRank() === pairRanks[1]
      );
      return new HandRank(game.TWO_PAIRS, HandRankAlias.TWO_PAIRS,
                          pairedHigherCards.concat(pairedLowerCards)
                                           .concat(unpairedCards)
                                           .slice(0, 5));
    }

    // One pair
    if (pairRanks.length === 1) {
      const pairedCards: Card[] = _.filter(cardgroup, (card: Card): boolean => {
        return card.getRank() === pairRanks[0];
      });
      const unpairedCards: Card[] = _.reject(cardgroup, (card: Card): boolean => {
        return card.getRank() === pairRanks[0];
      });
      return new HandRank(game.PAIR, HandRankAlias.PAIR, pairedCards.concat(unpairedCards).slice(0, 5));
    }

    // High card
    return new HandRank(game.HIGH_CARD, HandRankAlias.HIGH_CARD, cardgroup.slice(0, 5));
  }

  public getHighCards(): Card[] {
    return this.highcards;
  }

  public getRank(): number {
    return this.rank;
  }

  public compareTo(handrank: HandRank): number {
    if (this.getRank() === handrank.getRank()) {
      for (let i: number = 0; i < 5; i += 1) {
        if (this.getHighCards()[i].getRank() !== handrank.getHighCards()[i].getRank()) {
          return this.getHighCards()[i].getRank() > handrank.getHighCards()[i].getRank() ? 1 : -1;
        }
      }
      return 0;
    }
    return this.getRank() > handrank.getRank() ? 1 : -1;
  }

  public toString(): string {
    let showHighcards: number = 0;
    let s: string = '';
    switch (this.alias) {
      case HandRankAlias.STRAIGHT_FLUSH:
        if (this.highcards[0].getRank() === Rank.ACE) {
          s = 'Royal flush';
        } else {
          s = _.capitalize(this.highcards[0].toString(false, true)) + ' high straight flush';
        }
        break;
      case HandRankAlias.QUADS:
        s = 'Quad ' + this.highcards[0].toString(false, true, true);
        showHighcards = 1;
        break;
      case HandRankAlias.FULL_HOUSE:
        s = `Full house: ${this.highcards[0].toString(false, true, true)} full of ${this.highcards[4].toString(false, true, true)}`;
        break;
      case HandRankAlias.FLUSH:
        s = _.capitalize(this.highcards[0].toString(false, true)) + ' high flush';
        break;
      case HandRankAlias.STRAIGHT:
        s = _.capitalize(this.highcards[0].toString(false, true)) + ' high straight';
        break;
      case HandRankAlias.TRIPS:
        s = `Trip ${this.highcards[0].toString(false, true, true)}`;
        showHighcards = 2;
        break;
      case HandRankAlias.TWO_PAIRS:
        s = `Two pairs: ${this.highcards[0].toString(false, true, true)} and ${this.highcards[2].toString(false, true, true)}`;
        showHighcards = 1;
        break;
      case HandRankAlias.PAIR:
        s = `Pair of ${this.highcards[0].toString(false, true, true)}`;
        showHighcards = 3;
        break;
      default:
        s = 'High card';
        showHighcards = 5;
        break;
    }
    if (showHighcards > 0) {
      const highcards: string[] = this.highcards.slice(5 - showHighcards, 5).map((h: Card) => {
        return h.toString(false);
      });
      s = s + ` (${highcards.join(',')} high)`;
    }
    return s;
  }
}
