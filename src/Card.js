class Card {
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
}
