describe('Game', () => {
  it('has players', () => {
    player = new Player(name)
    game = new Game([player])
    expect(game.players).toEqual([player])
  })

  it('has bots', () => {
    num_of_bots = 1
    player = new Player(name)
    game = new Game([player], num_of_bots)
    expect(game.bots.length).toEqual(num_of_bots)
  })

  describe('start', () => {
    beforeEach(() => {
      num_of_bots = 1
      player = new Player(name)
      game = new Game([player], num_of_bots)
    })

    it('deals out cards from the deck', () => {
      game.start()
      expect(game.players[0].hand.length).toEqual(7)
      expect(game.deck.length()).toEqual(Game.deckSize-7)
      expect(game.players[0].hand.every((card) => card.rank)).toEqual(true)
    })
  })
})
