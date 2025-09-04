describe('Game', () => {
  let num_of_bots
  let player
  let game

  beforeEach(() => {
    num_of_bots = 1
    player = new Player(name)
    game = new Game([player], num_of_bots)
  })

  it('has players', () => {
    expect(game.players).toEqual([player])
  })

  it('has bots', () => {
    expect(game.bots.length).toEqual(num_of_bots)
    expect(game.bots.every(bot => bot.hand)).toEqual(true)
  })

  describe('start', () => {
    it('deals out cards from the deck', () => {
      game.start()
      expect(game.players[0].hand.length).toEqual(7)
      expect(game.bots[0].hand.length).toEqual(7)
      expect(game.deck.length()).toEqual(Game.deckSize-14)
      expect(game.players[0].hand.every((card) => card.rank)).toEqual(true)
    })
  })
})
