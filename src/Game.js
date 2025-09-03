class Game {
  constructor(players, num_of_bots) {
    this._players = players
    this._num_of_bots = Number(num_of_bots)
  }

  get players() {
    return this._players
  }

  get bots() {
    return Array.from(Array(this._num_of_bots).keys())
  }
}
