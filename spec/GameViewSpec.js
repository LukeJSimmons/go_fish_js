describe('GameView', () => {
  let player,
      game,
      view

  beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)
    player = new Human('Joe')
    game = new Game([player], 1)
    view = new GameView(game)
    game.start()
    view.draw(container)
  })

  afterEach(() => {
    container.remove()
  })

  it('displays bots', () => {
    expect(container.querySelectorAll('.accordion--player').length).toEqual(1)
  })

  it('displays bots hand size', () => {
    bot = container.querySelector('.accordion--player')
    expect(bot.querySelectorAll('.playing-card').length).toEqual(game.bots[0].hand.length)
  })

  it('displays hand', () => {
    hand = container.querySelector('.hand')
    expect(hand.querySelectorAll('.playing-card').length).toEqual(game.player.hand.length)
  })

  describe('request form', () => {
    describe('when form is submitted', () => {
      beforeEach(() => {
        player = new Human(name, [new Card('A','H')])
        game = new Game([player], 1)
        game.bots[0] = new Bot('Bot 1', [new Card('A','D')])
        const form = container.querySelector('form')
        form.querySelector('#submit').click()
      })

      it('plays a round on form submit', () => {
        expect(container.querySelectorAll('.feed-bubble').length).toEqual(1)
      })

      it('updates hands on form submit', () => {
        player_hand = container.querySelector('.hand')
        bot_hand = container.querySelector('.cards--player')
        expect(player_hand.querySelectorAll('.playing-card').length).toEqual(8)
        expect(bot_hand.querySelectorAll('.playing-card').length).toEqual(6)
      })
    })
  })
})
