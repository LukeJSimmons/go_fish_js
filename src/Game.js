class Game {
  static handSize = 7
  static deckSize = 52

  constructor(players, num_of_bots) {
    this._players = players
    this._num_of_bots = Number(num_of_bots)
    this._deck = new Deck
  }

  get players() {
    return this._players
  }

  get bots() {
    return Array.from(Array(this._num_of_bots))
  }

  get deck() {
    return this._deck
  }

  start() {
    this.players.map((player) => {
      Array.from(Array(Game.handSize)).forEach(n => player.hand.push(this.deck.draw_card()))
    })
  }
}
