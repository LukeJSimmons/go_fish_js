class GameView {
  constructor(game) {
    this.game = game
  }

  draw(container) {
    container.innerHTML = this.players()
  }

  players() {
    return `
    <div class="players">
      ${this.game.players.map(player => `<div class="player">${player.name}</div>`)}
      ${this.game.bots.map(bot => `<div class="player">Bot ${bot+1}</div>`)}
    </div>
    `
  }
}
