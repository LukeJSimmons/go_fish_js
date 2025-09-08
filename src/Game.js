class Game {
  static handSize = 7
  static deckSize = 52

  constructor(players, num_of_bots, deck = new Deck()) {
    this._players = players
    this._num_of_bots = Number(num_of_bots)
    this._bots = this.build_bots()
    this._deck = deck
    this._round_results = []
    this._round = 1
  }

  get players() {
    return this._bots.concat(this._players)
  }

  get player() {
    return this._players[0]
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

  get round() {
    return this._round
  }

  get current_player() {
    return this.players[this.round % this.players.length]
  }

  build_bots() {
    return Array.from(Array(this._num_of_bots).keys()).map(bot => new Bot(`Bot ${bot+1}`))
  }

  start() {
    this.deck.shuffle()
    this.deal_cards()
  }

  deal_cards() {
    const all_players = this.bots.concat([this.player])
    all_players.map((player) => {
      Array.from(Array(Game.handSize)).forEach(n => player.add_cards_to_hand(this.deck.draw_card()))
    })
  }

  play_round(request, target) {
    const matching_cards = this.handle_matching_cards(request, target)
    const drawn_card = matching_cards.length == 0 ? this.current_player.add_cards_to_hand(this.deck.draw_card()) : null
    this.round_results.push(new RoundResult(request, target, matching_cards, drawn_card))
    if (drawn_card && drawn_card.rank != request) this._round++
    if (this.current_player instanceof Bot) this.play_bot_round()
  }

  handle_matching_cards(request, target) {
    const target_player = this.players.find(player => player.name == target)
    const matching_cards = target_player.hand.filter(card => card.rank == request)
    this.current_player.add_cards_to_hand(matching_cards)
    target_player.remove_cards_from_hand(matching_cards)
    return matching_cards
  }

  play_bot_round() {
    const request = this.current_player.request()
    const target = this.player.name
    this.play_round(request, target)
  }
}
