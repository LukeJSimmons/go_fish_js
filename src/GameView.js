class GameView {
  constructor(game) {
    this.game = game
  }

  draw(container) {
    container.innerHTML = ''
    const players = document.createElement('ul')
    this.game.players.forEach((player) => players.innerHTML += `<li>${player.name}</li>`)
    this.game.bots.forEach((bot) => players.innerHTML += `<li>Bot ${bot+1}</li>`)
    container.append(players)
  }
}
