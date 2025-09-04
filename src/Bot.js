class Bot {
  constructor(name, hand=[]) {
    this._name = name
    this._hand = hand
  }

  get name() {
    return this._name
  }

  get hand() {
    return this._hand
  }

  add_card_to_hand(card) {
    this.hand.push(card)
  }
}
