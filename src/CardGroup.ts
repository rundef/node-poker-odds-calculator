import {Card} from './Card';
import * as _ from 'lodash';

interface UniqueRank {
  rank: number;
  count: number;
}

export class CardGroup extends Array {
  public constructor() {
    super();
  }

  public static fromString(s: string): CardGroup {
    const tmp = s.replace(/[^a-z0-9]/gi, '');
    if (tmp.length % 2 !== 0) {
      throw new Error(`Invalid cards: ${s}`);
    }

    const cardgroup = new CardGroup();
    for (let i = 0; i < tmp.length; i = i + 2) {
      cardgroup.push(Card.fromString(tmp.substring(i, i + 2)));
    }
    return cardgroup;
  }

  public static fromCards(cards: Card[]): CardGroup {
    const cardgroup = new CardGroup();
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

  public sortCards(type: string): void {
    const sorted = _.orderBy(this, ['rank', 'suit'], [type, type]);
    this.splice.apply(this, (<any[]> [ 0, this.length ]).concat(
      sorted
    ));
  }

  public concat(cardgroup: CardGroup): CardGroup {
    const ret = new CardGroup();
    for (const card of this) {
      ret.push(card);
    }
    for (const card of cardgroup) {
      ret.push(card);
    }
    return ret;
  }

  public countBy(type: string): any {
    return _.countBy(this, type);
  }
}
