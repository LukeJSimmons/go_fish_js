class Player {
  constructor(name, hand=[], books=[]) {
    this._name = name
    this._hand = hand
    this._books = books
  }

  get name() {
    return this._name
  }

  get hand() {
    return this._hand
  }

  get books() {
    return this._books
  }
}
