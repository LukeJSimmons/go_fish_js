class RoundResult {
  constructor(request, target) {
    this._request = request
    this._target = target
  }

  question() {
    return `You asked ${this._target} for ${this._request}s`
  }

  response() {
    return `response`
  }

  action() {
    return `action`
  }
}
