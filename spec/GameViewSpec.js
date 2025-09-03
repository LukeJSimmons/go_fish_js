describe('GameView', () => {
  beforeEach(() => {
    container = document.createElement('div')
    const player = new Player('Joe')
    const game = new Game([player], 1)
    const view = new GameView(game)
    view.draw(container)
  })

  it('displays player name', () => {
    expect(container.querySelector('li').innerText).toEqual('Joe')
  })
})
