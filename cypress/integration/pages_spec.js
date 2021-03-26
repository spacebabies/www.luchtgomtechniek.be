/// <reference types="cypress" />

describe('html-pages', () => {
  it('loads the index page', () => {
    cy.visit('/')
    cy.contains('Straal Atelier Val-Meer')
  })

  // it('loads the about page', () => {
  //   cy.visit('/commands/about')
  //   cy.contains('About')
  // })
})