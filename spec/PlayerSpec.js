describe('Player', () => {
  it('has a name', () => {
    name = 'joe'
    player = new Player(name)
    expect(player.name).toEqual(name)
  })
})
