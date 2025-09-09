describe('Card', () => {
  let rank,
      suit,
      card

  beforeEach(() => {
    rank = 'A'
    suit = 'H'
    card = new Card(rank, suit)
  })

  it('has a rank and suit', () => {
    expect(card.rank).toEqual(rank)
    expect(card.suit).toEqual(suit)
  })

  it('has a value', () => {
    expect(card.value).toEqual(12)
  })
})
