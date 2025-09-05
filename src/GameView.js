class GameView {
  constructor(game) {
    this.game = game
  }

  draw(container) {
    container.innerHTML = this.game_page()
    container.querySelector('form').addEventListener('submit', this.submitForm.bind(this))
  }

  submitForm(event) {
    event.preventDefault()
    const data = new FormData(document.querySelector('form'))
    this.game.play_round(data.get('request'), data.get('target'))
    this.update_view()
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
      ${this.bot_accordions()}
    </div>
    `
  }

  bot_accordions() {
    return this.game.bots.map(bot =>
      `
      <details class="accordion accordion--player">
        <summary>
          <i class="ph ph-caret-right icon accordion__marker"></i>
          <span class="accordion__label">${bot.name}</span>
        </summary>
        <div class="cards cards--player">
          ${bot.hand.map(card => `<img src="./src/images/cards/${card.rank}${card.suit}.svg" class="playing-card" />`).join('')}
        </div>
      </details>`
    ).join('')
  }

  feed_section() {
    return `
    <div class="feed">
      <div class="feed__output">
      </div>
      <form class="form">
        <div class="form-row">
          <div class="form-group">
            <label for="target">Target</label>
            <select class="form-control" id="target" name="target">
              ${this.game.bots.map(bot => ` <option value="${bot.name}">${bot.name}</option>`)}
            </select>
          </div>
          <div class="form-group">
            <label for="request">Request</label>
            <select class="form-control" id="request" name="request">
              ${this.game.player.hand.map(card => ` <option value=${card.rank}>${card.rank}</option>`)}
            </select>
          </div>
        </div>
        <input class="btn btn--primary" type="submit" id="submit" value="Request" />
      </form>
    </div>`
  }

  feed_output() {
    return this.game.round_results.map(result => {
      return `<div class="feed-bubble">${result}</div>`
    }).join('')
  }

  hand_section() {
    return `
    <div class="hand">
      ${this.player_hand()}
    </div>
    `
  }

  player_hand() {
    return `
    <div class="cards">
      ${this.game.player.hand.map(card =>
        `<img src="./src/images/cards/${card.rank}${card.suit}.svg" class="playing-card" alt="${card.rank}-${card.suit}" />`
      ).join('')}
    </div>`
  }

  books_section() {
    return `
    <div class="books">
      <div class="cards">
        ${this.game.player.books.map(card =>
          `<img src="./src/images/cards/2B.svg" class="playing-card" alt="${card.rank}-${card.suit}" />`
        ).join('')}
      </div>
    </div>
    `
  }

  update_view() {
    document.querySelector('.feed__output').innerHTML = this.feed_output()
    document.querySelector('.hand').innerHTML = this.player_hand()
    document.querySelector('.players').innerHTML = this.bot_accordions()
  }
}
