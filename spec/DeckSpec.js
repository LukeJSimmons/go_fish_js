describe('Deck', () => {
  it('has cards', () => {
    cards = [new Card('A', 'H')]
    deck = new Deck(cards)
    expect(deck.cards).toEqual(cards)
  })
})
