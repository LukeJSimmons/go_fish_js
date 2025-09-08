describe('RoundResult', () => {
  let request,
      target,
      matching_cards,
      drawn_card,
      result

  beforeEach(() => {
    request = 'A'
    target = 'Bot 1'
    matching_cards = []
    drawn_card = null
    current_player = new Human()
    result = new RoundResult(request, target, matching_cards, drawn_card, current_player)
  })

  describe('question', () => {
    let question

    it('returns string with target and request', () => {
      question = result.question()
      expect(question).toContain(target)
      expect(question).toContain(request)
    })

    describe('when current_player is a bot', () => {
      beforeEach(() => {
        request = 'A'
        target = 'Player'
        matching_cards = []
        drawn_card = null
        current_player = new Bot('Bot 1')
        result = new RoundResult(request, target, matching_cards, drawn_card, current_player)
      })

      it('displays message in the 2nd person', () => {
        question = result.question()
        expect(question).toContain(result._current_player.name)
        expect(question).toContain('asked You')
      })
    })
  })

  describe('response', () => {
    let response

    describe('when there are matching cards', () => {
      beforeEach(() => {
        matching_cards = [new Card('A','H')]
        result = new RoundResult(request, target, matching_cards, drawn_card)
      })

      it('returns string with request, target, amount taken', () => {
        response = result.response()
        expect(response).toContain(target)
        expect(response).toContain(request)
        expect(response).toContain(matching_cards.length)
      })
    })

    describe('when there are no matching cards', () => {
      it('returns string with request, target, but not amount taken', () => {
        response = result.response()
        expect(response).toContain(target)
        expect(response).toContain(request)
        expect(response).not.toContain(matching_cards.length)
      })
    })
  })

  describe('action', () => {
    let action

    describe('when there are matching cards', () => {
      beforeEach(() => {
        matching_cards = [new Card('A','H')]
        result = new RoundResult(request, target, matching_cards, drawn_card)
      })

      it('returns null', () => {
        action = result.action()
        expect(action).toEqual(null)
      })
    })

    describe('when there are no matching cards', () => {
      beforeEach(() => {
        drawn_card = new Card('A','H')
        result = new RoundResult(request, target, matching_cards, drawn_card)
      })

      it('returns a string with drawn card', () => {
        action = result.action()
        expect(action).toContain(drawn_card.rank)
      })
    })
  })
})
