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
    const fished_card = matching_cards.length == 0 ? this.current_player.add_cards_to_hand(this.deck.draw_card()) : null
    const scored_books = this.current_player.score_books_if_possible()
    const drawn_cards = this.draw_cards_if_necessary()
    this.round_results.unshift(new RoundResult(request, target, matching_cards, fished_card, this.current_player, scored_books))
    if (this.should_advance_round(fished_card, request, matching_cards)) this._round++
    if (this.current_player instanceof Bot) this.play_bot_round()
  }

  handle_matching_cards(request, target) {
    const target_player = this.players.find(player => player.name == target)
    const matching_cards = target_player.hand.filter(card => card.rank == request)
    this.current_player.add_cards_to_hand(matching_cards)
    target_player.remove_cards_from_hand(matching_cards)
    return matching_cards
  }

  draw_cards_if_necessary() {
    const drawn_cards = this.players.map(player => {
      if (player.hand.length == 0) return player.add_cards_to_hand(this.deck.draw_card())
      }
    )
    return drawn_cards
  }

  should_advance_round(fished_card, request, matching_cards) {
    return (fished_card && fished_card.rank != request) ||
    (!fished_card && matching_cards.length == 0)
  }

  play_bot_round() {
    if (this.game_over()) return
    const request = this.current_player.request()
    const target = this.player.name
    this.play_round(request, target)
  }

  winner() {
    if (!this.game_over()) return null
    const player_books = this.players.map(player => player.books)
    if (this.tie(player_books)) return this.player_with_highest_book(player_books)
    return this.player_with_most_books(player_books)
  }

  game_over() {
    return this.deck.cards.length == 0 &&
    this.players.filter(player => player.hand.length > 0).length == 0
  }

  tie(player_books) {
    return player_books.every(book => book.length > 0 && book.length == player_books[0].length)
  }

  player_with_most_books(player_books) {
    const player_books_count = player_books.map(books => books.length)
    return this.players[player_books_count.indexOf(Math.max(...player_books_count))]
  }

  player_with_highest_book(player_books) {
    const highest_values = player_books.flatMap(books => books.map(book => book[0].value))
    return this.players[highest_values.indexOf(Math.max(...highest_values))]
  }
}
