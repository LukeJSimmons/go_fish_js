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

  it('displays player name', () => {
    expect(container.querySelector('.player').innerText).toEqual('Joe')
  })

  it('displays bots', () => {
    expect(container.querySelectorAll('.player').length).toEqual(2)
  })

  it('displays hand', () => {
    expect(container.querySelectorAll('.playing-card').length).toEqual(game.players[0].hand.length)
  })
})
