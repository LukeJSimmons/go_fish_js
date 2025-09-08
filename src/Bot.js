class Bot extends Player {
  constructor(name, hand=[]) {
    super(name, hand)
  }

  request() {
    const index = Math.floor(Math.random() * this.hand.length)
    return this.hand[index].rank
  }
}
