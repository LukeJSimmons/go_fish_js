class Player {
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

  add_cards_to_hand(cards) {
    this.hand.push(cards)
    this._hand = this.hand.flat()
    return cards
  }

  remove_cards_from_hand(cards) {
    this._hand = this.hand.filter(card => !cards.includes(card))
  }

  unique_ranks() {
    return [...new Set(this.hand.map(card => card.rank))]
  }
}
