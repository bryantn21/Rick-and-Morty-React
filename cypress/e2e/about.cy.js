// Verifies "AboutPage.jsx should render general about information about the show",
// including the live stats pulled from the API (getShowStats).
// Stubbed with cy.intercept for the same reason as characters.cy.js's search tests:
// the character-render smoke test already proves the real API works, so this test
// focuses on the page's own logic/rendering instead of depending on live network.
describe('About page', () => {
  it('renders information about the show and live stats from the API', () => {
    cy.intercept('GET', '**/api/character', {
      statusCode: 200,
      body: { info: { count: 826 } },
    }).as('characterStats')
    cy.intercept('GET', '**/api/location', {
      statusCode: 200,
      body: { info: { count: 126 } },
    }).as('locationStats')
    cy.intercept('GET', '**/api/episode', {
      statusCode: 200,
      body: { info: { count: 51 } },
    }).as('episodeStats')

    cy.visit('/about')
    cy.wait(['@characterStats', '@locationStats', '@episodeStats'])

    cy.contains('h1', 'About Rick and Morty')
    cy.contains('Justin Roiland')
    cy.contains('826')
    cy.contains('126')
    cy.contains('51')
  })
})
