class RoundResult {
  constructor(request, target, matching_cards, drawn_card, current_player, scored_books) {
    this._request = request
    this._target = target
    this._matching_cards = matching_cards
    this._drawn_card = drawn_card
    this._current_player = current_player
    this._scored_books = scored_books
  }

  question() {
    return `${this.object()} asked ${this.subject()} for ${this._request}s`
  }

  response() {
    if (this._matching_cards.length > 0) return `You took ${this._matching_cards.length} ${this._request}s from ${this._target}`
    return `${this._target} didn't have any ${this._request}s`
  }

  action() {
    if (this._drawn_card) return `You drew a ${this._drawn_card.rank}`
    return null
  }

  books() {
    if (this._scored_books.length > 0) return `${this.object()} scored a book of ${this._scored_books[0][0].rank}`
    return null
  }

  object() {
    return this._current_player instanceof Human ? "You" : this._current_player.name
  }

  subject() {
    return this._target.includes("Bot") ? this._target : "You"
  }
}
