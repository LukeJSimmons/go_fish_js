class Human extends Player {
  constructor(name, hand=[], books=[]) {
    super(name, hand)
    this._books = books
  }

  get books() {
    return this._books
  }
}
