class Card {
  static ranks = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']
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
}
