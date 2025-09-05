describe('LoginView', () => {
  let view,
      stub,
      container,
      result

  beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)

    stub = function(name, botCount) {
      result = {name, botCount}
    }
    view = new LoginView(stub)
    view.draw(container)
  })

  it('should call function on form submit', () => {
    const form = container.querySelector('form')

    form.querySelector('#name').value = 'Test'
    form.querySelector('#num_of_bots').value = 1
    form.querySelector('#submit').click()

    expect(result.name).toEqual('Test')
    expect(result.botCount).toEqual('1')
    container.remove()
  })
})
