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

  it('displays current_player', () => {
    expect(container.innerHTML).toContain(`${game.current_player.name}'s Turn`)
  })

  describe('request form', () => {
    describe('options', () => {
      beforeEach(() => {
        player = new Human(name, [new Card('A','H'), new Card('A', 'D')])
        game = new Game([player], 1)
        view = new GameView(game)
        view.draw(container)
      })

      it('displays request options as unique ranks in player hand', () => {
        const request_select = container.querySelector('#request')
        expect(request_select.innerHTML).toContain(player.hand[0].rank)
        expect(request_select.querySelectorAll('option').length).toEqual(1)
      })
    })

    describe('when form is submitted', () => {
      beforeEach(() => {
        player = new Human(name, [new Card('A','H')])
        game = new Game([player], 1)
        game.bots[0] = new Bot('Bot 1', [new Card('A','D')])
        view = new GameView(game)
        view.draw(container)
        const form = container.querySelector('form')
        form.querySelector('#submit').click()
      })

      it('plays a round on form submit', () => {
        expect(container.querySelectorAll('.feed-bubble-group').length).toEqual(1)
        expect(container.querySelectorAll('.feed-bubble--question')[0].innerText).toContain('asked Bot 1')
      })

      it('updates hands on form submit', () => {
        player_hand = container.querySelector('.hand')
        bot_hand = container.querySelector('.cards--player')
        expect(player_hand.querySelectorAll('.playing-card').length).toEqual(2)
        expect(bot_hand.querySelectorAll('.playing-card').length).toEqual(1)
      })

      it('does not show the action bubble', () => {
        expect(container.querySelectorAll('.feed-bubble--action').length).toEqual(0)
      })

      describe('when a book is scored', () => {
        beforeEach(() => {
          player = new Human(name, [new Card('A','H'), new Card('A','S'), new Card('A','C')])
          game = new Game([player], 1)
          game.bots[0] = new Bot('Bot 1', [new Card('A','D')])
          view = new GameView(game)
          view.draw(container)
          const form = container.querySelector('form')
          form.querySelector('#submit').click()
        })

        it('displays scored book', () => {
          expect(container.querySelectorAll('.feed-bubble--book').length).toEqual(1)
        })

        it('adds scored book to books section', () => {
          const books_section = container.querySelector('.books')
          expect(books_section.querySelectorAll('.playing-card').length).toEqual(1)
          expect(books_section.querySelector('.playing-card').alt).toContain('A')
        })
      })
    })
  })
})
