class Bot extends Player {
  request() {
    const index = Math.floor(Math.random() * this.hand.length)
    return this.hand[index].rank
  }
}
