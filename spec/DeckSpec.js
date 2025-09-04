describe('Deck', () => {
  it('has cards', () => {
    deck = new Deck()
    expect(deck.cards.length).toEqual(Game.deckSize)
    expect(deck.cards.every(card => card.rank)).toEqual(true)
  })

  describe('shuffle', () => {
    it('shuffles the deck', () => {
      deck = new Deck()
      expect(deck.cards).toEqual(new Deck().cards)
      deck.shuffle()
      expect(deck.cards).not.toEqual(new Deck().cards)
    })
  })
})
