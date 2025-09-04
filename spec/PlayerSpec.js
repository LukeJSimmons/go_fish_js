describe('Player', () => {
  let name,
      player

  beforeEach(() => {
    name = 'joe'
    player = new Player(name)
  })

  it('has a name', () => {
    expect(player.name).toEqual(name)
  })

  it('has a hand', () => {
    expect(player.hand).toEqual([])
  })

  describe('add_card_to_hand', () => {
    it('adds card to hand', () => {
      card = new Card('A', 'H')
      player.add_card_to_hand(card)
      expect(player.hand[0]).toEqual(card)
    })
  })
})
