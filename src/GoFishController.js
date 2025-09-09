class GoFishController {
  container() {
    return document.getElementById('main')
  }

  login() {
    const view = new LoginView(this.startGame.bind(this))
    view.draw(this.container())
  }

  startGame(name, num_of_bots) {
    this.player = new Human(name)
    this.game = new Game([this.player], num_of_bots)
    const view = new GameView(this.game)
    this.game.start()
    view.draw(this.container())
  }
}

window.controller = new GoFishController();
window.onload = controller.login.bind(window.controller)
