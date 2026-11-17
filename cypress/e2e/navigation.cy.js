// Verifies the "NavBar.jsx should allow users to navigate your project" requirement:
// every link in the navbar actually gets you to the right page.
describe('NavBar navigation', () => {
  it('reaches Home, Characters, and About from the navbar', () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome to the Rick and Morty Explorer')

    cy.get('nav').contains('a', 'Characters').click()
    cy.url().should('include', '/characters')
    cy.contains('h1', 'Rick and Morty Characters')

    cy.get('nav').contains('a', 'About').click()
    cy.url().should('include', '/about')
    cy.contains('h1', 'About Rick and Morty')

    cy.get('nav').contains('a', 'Home').click()
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`)
    cy.contains('h1', 'Welcome to the Rick and Morty Explorer')
  })
})
