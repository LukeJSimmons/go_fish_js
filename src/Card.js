class Card {
  static ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
  static suits = ['H','D','S','C']

  constructor(rank, suit) {
    this._rank = rank
    this._suit = suit
  }

  get rank() {
    return this._rank
  }

  get suit() {
    return this._suit
  }

  get value() {
    return Card.ranks.indexOf(this.rank)
  }
}
