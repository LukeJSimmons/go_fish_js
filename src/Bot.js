class Bot extends Player {
  request() {
    if (this.hand.length == 0) return
    const index = Math.floor(Math.random() * this.hand.length)
    return this.hand[index].rank
  }
}
