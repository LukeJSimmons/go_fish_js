describe('Game', () => {
  let num_of_bots,
      hand,
      player,
      game

  beforeEach(() => {
    hand = []
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
        player = new Human(name, hand)
        game = new Game([player], num_of_bots)
        game.bots[0] = new Bot('Bot 1', [new Card('A','D')])
      })

      it('adds matching card to player hand', () => {
        expect(game.player.hand.length).toEqual(1)
        game.play_round(request, target)
        expect(game.player.hand.length).toEqual(2)
      })

      it('removes matching card from target hand', () => {
        expect(game.bots[0].hand.length).toEqual(1)
        game.play_round(request, target)
        expect(game.bots[0].hand.length).toEqual(0)
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
        player = new Human(name, hand)
        deck = new Deck([new Card('A','D')])
        game = new Game([player], num_of_bots, deck)
        game.bots[0] = new Bot('Bot 1', [new Card('10','D')])
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
          player = new Human(name, hand)
          deck = new Deck([new Card('8','D'), new Card('5','D')])
          game = new Game([player], num_of_bots, deck)
          game.bots[0] = new Bot('Bot 1', [new Card('10','D')])
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
  })
})
