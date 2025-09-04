describe('GameView', () => {
  let player
  let game
  let view

  beforeEach(() => {
    container = document.createElement('div')
    player = new Player('Joe')
    game = new Game([player], 1)
    view = new GameView(game)
    game.start()
    view.draw(container)
  })

  it('displays bots', () => {
    expect(container.querySelectorAll('.player').length).toEqual(1)
  })

  it('displays bots hand size', () => {
    bot = container.querySelector('.player')
    expect(bot.querySelectorAll('.playing-card').length).toEqual(game.bots[0].hand.length)
  })

  it('displays hand', () => {
    hand = container.querySelector('.hand')
    expect(hand.querySelectorAll('.playing-card').length).toEqual(game.players[0].hand.length)
  })
})
