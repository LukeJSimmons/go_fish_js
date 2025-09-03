class LoginView {
  constructor(startGame) {
    this.startGame = startGame
  }

  draw(container) {
    const form = this.render_form()
    container.innerHTML = form
  }

  render_form() {
    return `
    <form class="form" onsubmit="${this.submitForm}">
      <div class="form-group">
        <label for="name">Name</label>
        <input class="form-control" type="text" name="name" id="name" required />
      </div>
      <div class="form-group">
        <label for="num_of_bots">Number of bots</label>
        <input class="form-control" type="number" name="num_of_bots" id="num_of_bots" value=1 />
      </div>
      <input class="btn btn--primary" type="submit" />
    </form>`
  }

  submitForm(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    this.startGame(data.get('name'), data.get('num_of_bots'))
  }
}
