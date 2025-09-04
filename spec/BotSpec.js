describe('Bot', () => {
  let bot

  beforeEach(() => {
    bot = new Bot()
  })

  it('has a hand', () => {
    expect(bot.hand).toEqual([])
  })

  describe('name_with_index', () => {
    it('returns an indexed name', () => {
      const bot2 = new Bot()
      const bots = [bot, bot2]
      expect(bot.name_with_index(bots)).toEqual("Bot 1")
      expect(bot2.name_with_index(bots)).toEqual("Bot 2")
    })
  })

  describe('add_card_to_hand', () => {
    it('adds card to hand', () => {
      card = new Card('A', 'H')
      bot.add_card_to_hand(card)
      expect(bot.hand[0]).toEqual(card)
    })
  })
})
