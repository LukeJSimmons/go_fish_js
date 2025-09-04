class LoginView {
  constructor(startGame) {
    this.startGame = startGame
  }

  draw(container) {
    container.innerHTML = this.form_element()
    container.querySelector('form').addEventListener('submit', this.submitForm.bind(this))
  }

  form_element() {
    return `
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input class="form-control" type="text" name="name" id="name" required />
      </div>
      <div class="form-group">
        <label for="num_of_bots">Number of bots</label>
        <input class="form-control" type="number" name="num_of_bots" id="num_of_bots" value=1 />
      </div>
      <input class="btn btn--primary" type="submit" id="submit" />
    </form>`
  }

  submitForm(event) {
    event.preventDefault()
    const data = new FormData(document.querySelector('form'))
    this.startGame(data.get('name'), data.get('num_of_bots'))
  }
}
