class Deck {
  constructor(cards=this.build_deck()) {
    this._cards = cards
  }

  get cards() {
    return this._cards
  }

  length() {
    return this.cards.length
  }

  build_deck() {
    return Card.ranks.flatMap(rank => Card.suits.map(suit => new Card(rank, suit)) )
  }

  draw_card() {
   return this.cards.pop()
  }

  shuffle() {
    let currentIndex = this.cards.length

    while(currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      [this.cards[currentIndex], this.cards[randomIndex]] =
      [this.cards[randomIndex], this.cards[currentIndex]]
    }
  }
}
