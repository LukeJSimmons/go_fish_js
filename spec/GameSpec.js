describe('Game', () => {
  let num_of_bots,
      hand,
      bot_hand,
      player,
      game

  beforeEach(() => {
    hand = []
    bot_hand = []
    num_of_bots = 1
    player = new Human(name, hand)
    game = new Game([player], num_of_bots)
  })

  it('has a player', () => {
    expect(game.player).toEqual(player)
  })

  it('has bots', () => {
    expect(game.bots.length).toEqual(num_of_bots)
    expect(game.bots.every(bot => bot.hand)).toEqual(true)
  })

  it('has a round', () => {
    expect(game.round).toEqual(1)
  })

  it('has a current_player', () => {
    expect(game.current_player).toEqual(game.player)
  })

  describe('start', () => {
    it('deals out cards from the deck', () => {
      game.start()
      expect(game.player.hand.length).toEqual(7)
      expect(game.bots[0].hand.length).toEqual(7)
      expect(game.deck.length()).toEqual(Game.deckSize-14)
      expect(game.player.hand.every((card) => card.rank)).toEqual(true)
    })
  })

  describe('play_round', () => {
    let request,
        target

    beforeEach(() => {
      request = 'A'
      target = 'Bot 1'
      game.start()
    })

    describe('when there are matching cards', () => {
      beforeEach(() => {
        hand = [new Card('A','H')]
        bot_hand = [new Card('A','D')]
        player = new Human(name, hand)
        game = new Game([player], num_of_bots)
        game.bots[0] = new Bot('Bot 1', bot_hand)
      })

      it('adds matching card to player hand', () => {
        expect(game.player.hand.length).toEqual(1)
        game.play_round(request, target)
        expect(game.player.hand.length).toEqual(2)
      })

      it('removes matching card from target hand', () => {
        expect(game.bots[0].hand.length).toEqual(1)
        game.play_round(request, target)
        expect(game.bots[0].hand.length).toEqual(1)
      })

      it ('does not increment round', () => {
        expect(game.round).toEqual(1)
        game.play_round(request, target)
        expect(game.round).toEqual(1)
      })

      it('adds result to round_results', () => {
        expect(game.round_results.length).toEqual(0)
        game.play_round(request, target)
        expect(game.round_results.length).toEqual(1)
      })
    })

    describe('when there are no matching cards', () => {
      beforeEach(() => {
        hand = [new Card('A','H')]
        bot_hand = [new Card('10','D')]
        player = new Human(name, hand)
        deck = new Deck([new Card('A','D')])
        game = new Game([player], num_of_bots, deck)
        game.bots[0] = new Bot('Bot 1', bot_hand)
      })

      it('draws a card to player hand from the deck', () => {
        expect(game.player.hand.length).toEqual(1)
        expect(game.deck.cards.length).toEqual(1)
        game.play_round(request, target)
        expect(game.deck.cards.length).toEqual(0)
        expect(game.player.hand.length).toEqual(2)
      })

      it('does not removes any cards from target hand', () => {
        expect(game.bots[0].hand.length).toEqual(1)
        game.play_round(request, target)
        expect(game.bots[0].hand.length).toEqual(1)
      })

      describe('when drawn card is request', () => {
        it ('does not increment round', () => {
          expect(game.round).toEqual(1)
          game.play_round(request, target)
          expect(game.round).toEqual(1)
        })
      })

      describe('when drawn card is not request', () => {
        beforeEach(() => {
          hand = [new Card('A','H')]
          bot_hand = [new Card('10','D')]
          player = new Human(name, hand)
          deck = new Deck([new Card('8','D'), new Card('5','D')])
          game = new Game([player], num_of_bots, deck)
          game.bots[0] = new Bot('Bot 1', bot_hand)
        })

        it ('increments round', () => {
          expect(game.round).toEqual(1)
          game.play_round(request, target)
          expect(game.round).toEqual(3)
        })

        it('plays bot round', () => {
          expect(game.round_results.length).toEqual(0)
          game.play_round(request, target)
          expect(game.round_results.length).toEqual(2)
        })
      })
    })

    describe('when a book is scored', () => {
      beforeEach(() => {
        request = 'A'
        target = 'Bot 1'
        game.start()
        hand = [new Card('A','H'), new Card('A','S'), new Card('A','C')]
        bot_hand = [new Card('A','D')]
        player = new Human(name, hand)
        game = new Game([player], num_of_bots)
        game.bots[0] = new Bot('Bot 1', bot_hand)
      })

      it('removes book from hand', () => {
        expect(game.player.hand.length).toEqual(3)
        game.play_round(request, target)
        expect(game.player.hand.length).toEqual(1)
      })

      it('adds book to books', () => {
        expect(game.player.books.length).toEqual(0)
        game.play_round(request, target)
        expect(game.player.books.length).toEqual(1)
      })
    })

    describe('when your hand is empty', () => {
      beforeEach(() => {
        hand = [new Card('A','H'), new Card('A','S'), new Card('A','C')]
        bot_hand = [new Card('10','D')]
        player = new Human(name, hand)
        deck = new Deck([new Card('8','H'), new Card('A','D')])
        game = new Game([player], num_of_bots, deck)
        game.bots[0] = new Bot('Bot 1', bot_hand)
      })

      it('draws a card', () => {
        expect(game.player.hand.length).toEqual(3)
        game.play_round(request, target)
        expect(game.player.hand.length).toEqual(1)
      })
    })

    describe('when the bots hand is empty and the deck is empty', () => {
      beforeEach(() => {
        hand = [new Card('A','H'), new Card('10','D'), new Card('10','S'), new Card('10','C')]
        bot_hand = [new Card('10','H'), new Card('A','D'), new Card('A','S'), new Card('A','C')]
        player = new Human(name, hand)
        deck = new Deck([])
        game = new Game([player], num_of_bots, deck)
        game.bots[0] = new Bot('Bot 1', bot_hand)
      })

      it('skips their turn', () => {
        expect(game.bots[0].hand.length).toEqual(4)
        game.play_round(request, target)
        game.play_round(request, target)
        expect(game.bots[0].hand.length).toEqual(0)
      })
    })

    describe('when the deck is empty', () => {
      beforeEach(() => {
        hand = [new Card('A','H')]
        bot_hand = [new Card('10','D')]
        player = new Human(name, hand)
        deck = new Deck([])
        game = new Game([player], num_of_bots, deck)
        game.bots[0] = new Bot('Bot 1', bot_hand)
      })

      it('does not draw a card', () => {
        expect(game.player.hand.length).toEqual(1)
        game.play_round(request, target)
        expect(game.player.hand.length).toEqual(1)
      })
    })
  })

  describe('winner', () => {
    let request,
        target

    beforeEach(() => {
      request = 'A'
      target = 'Bot 1'
      game.start()
    })

    describe('when game is not over', () => {
      beforeEach(() => {
        hand = [new Card('A','H')]
        bot_hand = [new Card('10','D'), new Card('10','S'), new Card('10','C')]
        player = new Human(name, hand)
        deck = new Deck([new Card('10','H')])
        game = new Game([player], num_of_bots, deck)
        game.bots[0] = new Bot('Bot 1', bot_hand)
      })

      it('returns null', () => {
        expect(game.winner()).toEqual(null)
      })
    })

    describe('when game is over', () => {
      describe('when player wins', () => {
        beforeEach(() => {
          hand = [new Card('A','H'), new Card('A','S'), new Card('A','C')]
          bot_hand = []
          player = new Human(name, hand)
          deck = new Deck([new Card('A','D')])
          game = new Game([player], num_of_bots, deck)
          game.bots[0] = new Bot('Bot 1', bot_hand)
        })

        it('returns player', () => {
          game.play_round(request, target)
          expect(game.winner()).toEqual(game.player)
        })
      })

      describe('when bot wins', () => {
        let bot_books

        beforeEach(() => {
          hand = [new Card('9','D')]
          bot_hand = [new Card('9','H'), new Card('9','S'), new Card('9','C')]
          bot_books = [[new Card('A','H'), new Card('A','D'), new Card('A','S'), new Card('A','C')],[new Card('9','H'), new Card('9','D'), new Card('9','S'), new Card('9','C')]]
          player = new Human(name, hand)
          deck = new Deck([])
          game = new Game([player], num_of_bots, deck)
          game.bots[0] = new Bot('Bot 1', bot_hand, bot_books)
        })

        it('returns bot', () => {
          game.play_round('9', target)
          expect(game.winner()).toEqual(game.bots[0])
        })
      })

      describe('when there is a tie', () => {
        let bot_books

        describe('when player has highest rank book', () => {
          beforeEach(() => {
            hand = [new Card('A','D')]
            bot_hand = [new Card('A','H'), new Card('A','S'), new Card('A','C')]
            bot_books = [[new Card('9','H'), new Card('9','D'), new Card('9','S'), new Card('9','C')]]
            player = new Human(name, hand)
            deck = new Deck([])
            game = new Game([player], num_of_bots, deck)
            game.bots[0] = new Bot('Bot 1', bot_hand, bot_books)
          })

          it('returns player', () => {
            game.play_round('A', target)
            expect(game.winner()).toEqual(game.player)
          })
        })

        describe('when bot has highest rank book', () => {
          beforeEach(() => {
            hand = [new Card('9','D')]
            bot_hand = [new Card('9','H'), new Card('9','S'), new Card('9','C')]
            bot_books = [[new Card('A','H'), new Card('A','D'), new Card('A','S'), new Card('A','C')]]
            player = new Human(name, hand)
            deck = new Deck([])
            game = new Game([player], num_of_bots, deck)
            game.bots[0] = new Bot('Bot 1', bot_hand, bot_books)
          })

          it('returns bot', () => {
            game.play_round('9', target)
            expect(game.winner()).toEqual(game.bots[0])
          })
        })
      })
    })
  })
})
