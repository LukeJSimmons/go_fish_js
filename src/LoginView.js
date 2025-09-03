class LoginView {
  constructor(startGame) {
    this.startGame = startGame
  }

  draw(container) {
    container.innerHTML = ''
    const form = document.createElement('form')
    form.innerHTML = this.form_inputs()
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const data = new FormData(form)
      this.startGame(data.get('name'), data.get('num_of_bots'))
    })
    container.append(form)
  }

  form_inputs() {
    return `
    <div class="form-group">
      <label for="name">Name</label>
      <input class="form-control" type="text" name="name" id="name" required />
    </div>
    <div class="form-group">
      <label for="num_of_bots">Number of bots</label>
      <input class="form-control" type="number" name="num_of_bots" id="num_of_bots" value=1 />
    </div>
    <input class="btn btn--primary" type="submit" id="submit" />`
  }
}
