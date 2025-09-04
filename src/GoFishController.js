class GoFishController {
  container() {
    return document.getElementById('main')
  }

  login() {
    const view = new LoginView(this.startGame.bind(this))
    view.draw(this.container())
  }

  startGame(name, num_of_bots) {
    const player = new Player(name)
    const game = new Game([player], num_of_bots)
    const view = new GameView(game)
    game.start()
    view.draw(this.container())
  }
}

window.controller = new GoFishController();
window.onload = controller.login.bind(window.controller)
