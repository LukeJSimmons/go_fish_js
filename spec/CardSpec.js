describe('Card', () => {
  it('has a rank and suit', () => {
    rank = 'A'
    suit = 'H'
    card = new Card(rank, suit)
    expect(card.rank).toEqual(rank)
    expect(card.suit).toEqual(suit)
  })
})
