class GameView {
  constructor(game) {
    this.game = game
  }

  draw(container) {
    container.innerHTML = this.game_page()
  }

  game_page() {
    return `
    ${this.players_section()}
    ${this.hand_section()}
    `
  }

  players_section() {
    return `
    <div class="players">
      ${this.game.players.map(player => `<div class="player">${player.name}</div>`).join('')}
      ${this.game.bots.map(bot => `<div class="player">Bot ${bot+1}</div>`).join('')}
    </div>
    `
  }

  hand_section() {
    return `
    <div class="hand">
      <div class="cards">
        ${this.game.players[0].hand.map(card => `<img src="./src/images/cards/${card.rank}${card.suit}.svg" class="playing-card" alt="${card.rank}-${card.suit}" />`).join('')}
      </div>
    </div>
    `
  }
}
