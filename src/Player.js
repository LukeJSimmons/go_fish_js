class Player {
  constructor(name, hand=[]) {
    this._name = name
    this._hand = hand
  }

  get name() {
    return this._name
  }

  get hand() {
    return this._hand
  }
}
