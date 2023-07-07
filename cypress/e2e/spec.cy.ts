describe('prueba-busqueda-libros', () => {
  it('passes', () => {
    cy.visit('http://localhost:8100/home');
    cy.wait(400);
    cy.get('#input')
      .click()
      .type("Agridulce")
      .type('{enter}');
  })
})