describe('Game', () => {
  it('has players', () => {
    player = new Player(name)
    game = new Game([player])
    expect(game.players).toEqual([player])
  })

  it('has bots', () => {
    num_of_bots = 1
    player = new Player(name)
    game = new Game(player, num_of_bots)
    expect(game.bots.length).toEqual(num_of_bots)
  })
})
