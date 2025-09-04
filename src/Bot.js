class Bot {
  constructor(hand=[]) {
    this._hand = hand
  }

  get hand() {
    return this._hand
  }

  name_with_index(bots_array) {
    return `Bot ${bots_array.indexOf(this)+1}`
  }

  add_card_to_hand(card) {
    this.hand.push(card)
  }
}
