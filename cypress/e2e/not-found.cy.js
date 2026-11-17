// Verifies the catch-all `path: '*'` route: any URL that doesn't match a real page
// renders NotFound.jsx instead of a blank screen or a router error.
describe('Unknown routes', () => {
  it('shows the NotFound page for a URL that does not match any route', () => {
    cy.visit('/this-page-does-not-exist')
    cy.contains('404')
    cy.contains('Sorry, this page does not exist.')

    cy.contains('a', 'Go back home').click()
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`)
  })
})
