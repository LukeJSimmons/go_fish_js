describe('Bot', () => {
  let bot

  beforeEach(() => {
    bot = new Bot()
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
})
