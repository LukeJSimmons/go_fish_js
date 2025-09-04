class GameView {
  constructor(game) {
    this.game = game
  }

  draw(container) {
    container.innerHTML = this.game_page()
  }

  game_page() {
    return `
    <div class="game-page">
      ${this.players_section()}
      ${this.feed_section()}
      ${this.hand_section()}
      ${this.books_section()}
    </div>`
  }

  players_section() {
    return `
    <div class="players">
      ${this.game.bots.map(bot => {
        return `
        <details class="accordion accordion--player">
          <summary>
            <i class="ph ph-caret-right icon accordion__marker"></i>
            <span class="accordion__label">${bot.name}</span>
          </summary>
          <div class="cards cards--player">
            ${bot.hand.map(card => `<img src="./src/images/cards/2B.svg" class="playing-card" />`).join('')}
          </div>
        </details>`
      }).join('')}
    </div>
    `
  }

  feed_section() {
    return `
    <div class="feed">

    </div>`
  }

  hand_section() {
    return `
    <div class="hand">
      <div class="cards">
        ${this.game.players[0].hand.map(card =>
          `<img src="./src/images/cards/${card.rank}${card.suit}.svg" class="playing-card" alt="${card.rank}-${card.suit}" />`
        ).join('')}
      </div>
    </div>
    `
  }

  books_section() {
    return `
    <div class="books">
      <div class="cards">
        ${this.game.players[0].books.map(card =>
          `<img src="./src/images/cards/${card.rank}${card.suit}.svg" class="playing-card" alt="${card.rank}-${card.suit}" />`
        ).join('')}
      </div>
    </div>
    `
  }
}
