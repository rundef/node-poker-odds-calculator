/**
 * CardGroup
 *
 * a group of card objects
 * (typically either a player's hand, or the shared board)
 */
import countBy from 'lodash/countBy.js';
import orderBy from 'lodash/orderBy.js';
import {Card} from './Card.js';

export class CardGroup extends Array {
  public constructor() {
    super();
  }

  public static fromString(s: string): CardGroup {
    const tmp: string = s.replace(/[^a-z0-9]/gi, '');
    if (tmp.length % 2 !== 0) {
      throw new Error(`Invalid cards: ${s}`);
    }

    const cardgroup: CardGroup = new CardGroup();
    for (let i: number = 0; i < tmp.length; i = i + 2) {
      cardgroup.push(Card.fromString(tmp.substring(i, i + 2)));
    }
    return cardgroup;
  }

  public static fromCards(cards: Card[]): CardGroup {
    const cardgroup: CardGroup = new CardGroup();
    for (const card of cards) {
      cardgroup.push(card);
    }
    return cardgroup;
  }

  public contains(c: Card): boolean {
    for (const card of this) {
      if (card.equals(c)) {
        return true;
      }
    }
    return false;
  }

  public toString(): string {
    return '' + this.join(' ');
  }

  public sortCards(orderType: "asc" | "desc"): void {
    const sorted: Card[]  = orderBy(this, ['rank', 'suit'], [orderType, orderType]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.splice.apply(this, (<any[]> [ 0, this.length ]).concat(
      sorted
    ));
  }

  public concat(cardgroup: CardGroup): CardGroup {
    const ret: CardGroup = new CardGroup();
    for (const card of this) {
      ret.push(card);
    }
    for (const card of cardgroup) {
      ret.push(card);
    }
    return ret;
  }

  public countBy(cardType: string): {[x: string]: number}  {
    return countBy(this, cardType);
  }
}
