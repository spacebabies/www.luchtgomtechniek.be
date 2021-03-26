/// <reference types="cypress" />

context('Cookies', () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true)

    cy.visit('/nl/')
  })

  it('has cookie: <nf_lang>', () => {
    cy.getCookie('nf_lang').should('exist')
  })
})
