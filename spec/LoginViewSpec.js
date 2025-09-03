describe('LoginView', () => {
  beforeEach(() => {
    stub = jasmine.createSpy('stub')
    view = new LoginView(stub)
    container = document.createElement('div')
    view.draw(container)
  })

  it('should call function on form submit', () => {
    container.querySelector('form').dispatchEvent(new Event("submit"))
    expect(stub).toHaveBeenCalled()
  })
})
