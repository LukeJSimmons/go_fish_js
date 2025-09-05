class RoundResult {
  constructor(request, target, matching_cards, drawn_card) {
    this._request = request
    this._target = target
    this._matching_cards = matching_cards
    this._drawn_card = drawn_card
  }

  question() {
    return `You asked ${this._target} for ${this._request}s`
  }

  response() {
    if (this._matching_cards.length > 0) return `You took ${this._matching_cards.length} ${this._request}s from ${this._target}`
    return `${this._target} didn't have any ${this._request}s`
  }

  action() {
    if (this._drawn_card) return `You drew a ${this._drawn_card.rank}`
    return ''
  }
}
