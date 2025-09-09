class GameView {
  constructor(game) {
    this.game = game
    this.container = null
  }

  draw(container) {
    this.container = container
    container.innerHTML = this.game_page()
    container.querySelector('form').addEventListener('submit', this.submitForm.bind(this))
  }

  submitForm(event) {
    event.preventDefault()
    const data = new FormData(document.querySelector('form'))
    this.game.play_round(data.get('request'), data.get('target'))
    if (this.game.winner()) debugger
    this.draw(this.container)
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
    <div class="panel">
      <div class="panel__header">
        <span class="panel__title">Go Fish</span>
        <span>${this.game.deck.cards.length}</span>
      </div>
      <div class="players">
        ${this.bot_accordions()}
      </div>
    </div>`
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
    <div class="panel panel--highlight">
      <div class="panel__header">
        <span class="panel__title">Feed</span>
        <span class="badge">${this.game.current_player.name}'s Turn</span>
      </div>
      <div class="feed">
        <div class="feed__output">
          ${this.feed_output()}
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
                ${this.game.player.unique_ranks().map(rank => ` <option value=${rank}>${rank}</option>`)}
              </select>
            </div>
          </div>
          <input
            class="btn btn--primary"
            type="submit" id="submit"
            value="Request"
          />
        </form>
      </div>
    </div>`
  }

  feed_output() {
    return this.game.round_results.map(result => {
      return `
      <div class="feed-bubble-group">
        <div class="feed-bubble feed-bubble--question">${result.question()}</div>
        <div class="feed-bubble-row">
          <i class="ph ph-arrow-elbow-down-right icon"></i>
          <div class="feed-bubble feed-bubble--response">${result.response()}</div>
        </div>
        ${result.action() != null ? `
          <div class="feed-bubble-row">
            <i class="ph ph-arrow-elbow-down-right icon"></i>
            <div class="feed-bubble feed-bubble--action">${result.action()}</div>
          </div>` : ``}
        ${result.books() != null ? `
          <div class="feed-bubble-row">
            <i class="ph ph-arrow-elbow-down-right icon"></i>
            <div class="feed-bubble feed-bubble--book">${result.books()}</div>
          </div>` : ``}
      </div>`
    }).join('')
  }

  hand_section() {
    return `
    <div class="panel panel--gutter">
      <div class="panel__header">
        <span class="panel__title">Your Hand</span>
      </div>
      <div class="hand">
        ${this.player_hand()}
      </div>
    </div>`
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
    <div class="panel panel--gutter">
      <div class="panel__header">
        <span class="panel__title">Your Books</span>
      </div>
      <div class="books">
        <div class="cards">
          ${this.game.player.books.map(book =>
            `<img
              src="./src/images/cards/${book[0].rank}${book[0].suit}.svg"
              class="playing-card"
              alt="${book[0].rank}-${book[0].suit}"
            />`
          ).join('')}
        </div>
      </div>
    </div>`
  }
}
