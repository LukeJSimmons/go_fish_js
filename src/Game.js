class Game {
  static handSize = 7
  static deckSize = 52

  constructor(players, num_of_bots) {
    this._players = players
    this._num_of_bots = Number(num_of_bots)
    this._bots = this.build_bots()
    this._deck = new Deck()
    this._round_results = []
  }

  get players() {
    return this._players
  }

  get bots() {
    return this._bots
  }

  get deck() {
    return this._deck
  }

  get round_results() {
    return this._round_results
  }

  build_bots() {
    return Array.from(Array(this._num_of_bots).keys()).map(bot => new Bot(`Bot ${bot+1}`))
  }

  start() {
    this.deck.shuffle()
    this.deal_cards()
  }

  deal_cards() {
    const all_players = this.players.concat(this.bots)
    all_players.map((player) => {
      Array.from(Array(Game.handSize)).forEach(n => player.add_card_to_hand(this.deck.draw_card()))
    })
  }

  play_round(request, target) {
    this.round_results.push(`You asked ${target} for ${request}s`)
  }
}
