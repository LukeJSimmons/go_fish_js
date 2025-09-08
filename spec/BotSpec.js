describe('Bot', () => {
  let bot,
      hand

  beforeEach(() => {
    hand = []
    bot = new Bot('Bot 1', hand)
  })

  it('has a hand', () => {
    expect(bot.hand).toEqual([])
  })

  describe('add_cards_to_hand', () => {
    it('adds card to hand', () => {
      card = new Card('A', 'H')
      bot.add_cards_to_hand(card)
      expect(bot.hand[0]).toEqual(card)
    })
  })

  describe('request', () => {
    beforeEach(() => {
      hand = [new Card('A','H'), new Card('10','C')]
      bot = new Bot('Bot 1', hand)
    })

    it('returns random rank from hand', () => {
      expect(bot.hand.map(card => card.rank)).toContain(bot.request())
    })
  })
})
