describe('Bot', () => {
  let bot

  it('has a hand', () => {
    bot = new Bot()
    expect(bot.hand).toEqual([])
  })
})
