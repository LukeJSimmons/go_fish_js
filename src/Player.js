class Player {
  constructor(name, hand=[], books=[]) {
    this._name = name
    this._hand = hand
    this._books = books
  }

  get name() {
    return this._name
  }

  get hand() {
    return this._hand
  }

  add_cards_to_hand(cards) {
    if (!cards || (cards instanceof Array && !cards[0])) return
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

  score_books_if_possible() {
    const scored_books = []
    Card.ranks.forEach(rank => {
      const rank_group = this.hand.filter(card => card.rank == rank)
      if (rank_group.length == 4) {
        scored_books.push(rank_group)
        this._books.push(rank_group)
        this.remove_cards_from_hand(rank_group)
      }
    })
    return scored_books
  }
}
