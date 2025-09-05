describe('Player', () => {
  let name,
      player

  beforeEach(() => {
    name = 'joe'
    player = new Human(name)
  })

  it('has a name', () => {
    expect(player.name).toEqual(name)
  })

  it('has a hand', () => {
    expect(player.hand).toEqual([])
  })

  describe('add_cards_to_hand', () => {
    let card

    describe('when adding one card', () => {
      it('adds card to hand', () => {
        card = new Card('A', 'H')
        player.add_cards_to_hand(card)
        expect(player.hand[0]).toEqual(card)
      })
    })

    describe('when adding multiple cards', () => {
      let cards

      it('adds card to hand', () => {
        cards = [new Card('A', 'H'), new Card('A', 'D')]
        player.add_cards_to_hand(cards)
        expect(player.hand).toEqual(cards)
      })
    })
  })
})
