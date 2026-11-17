// Verifies "CharactersPage.jsx should render a Card BootStrap Component for every
// character within the Rick and Morty API", plus the search/filter behavior.
describe('Characters page', () => {
  it('renders a Bootstrap Card for every character on the page', () => {
    // This is the one test in the suite that deliberately hits the real, live API
    // (no cy.intercept) -- an integration smoke test proving the app actually talks
    // to rickandmortyapi.com successfully.
    cy.visit('/characters')
    cy.get('.card').should('have.length.greaterThan', 0)
    cy.get('.card')
      .first()
      .within(() => {
        cy.get('img.card-img-top').should('be.visible')
        cy.get('.card-title').should('not.be.empty')
      })
  })

  // Every test below stubs the character API with cy.intercept. Hitting the real
  // endpoint repeatedly from an automated browser is unreliable here -- Cloudflare's
  // bot protection intermittently returns a bare network error instead of the real
  // response after enough requests pile up in one session (confirmed with curl that
  // the real API itself behaves correctly), which isn't something this app's code
  // can control. Stubbing keeps these UI-behavior tests deterministic.
  describe('search behavior (stubbed API)', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/character**', (req) => {
        if (req.url.includes('name=Rick')) {
          req.reply({
            statusCode: 200,
            body: {
              info: { count: 2, pages: 1, next: null, prev: null },
              results: [
                {
                  id: 1,
                  name: 'Rick Sanchez',
                  status: 'Alive',
                  species: 'Human',
                  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                },
                {
                  id: 8,
                  name: 'Albino Rick',
                  status: 'unknown',
                  species: 'Human',
                  image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
                },
              ],
            },
          })
        } else if (req.url.includes('name=nomatch')) {
          req.reply({ statusCode: 404, body: { error: 'There is nothing here' } })
        } else {
          // The initial, un-searched page load that happens on every visit below.
          req.reply({
            statusCode: 200,
            body: {
              info: { count: 1, pages: 1, next: null, prev: null },
              results: [
                {
                  id: 1,
                  name: 'Rick Sanchez',
                  status: 'Alive',
                  species: 'Human',
                  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                },
              ],
            },
          })
        }
      }).as('charactersApi')

      cy.visit('/characters')
      cy.wait('@charactersApi')
    })

    it('filters characters when you search by name', () => {
      cy.get('input[type="search"]').type('Rick')
      cy.wait('@charactersApi')

      cy.get('.card-title').should(($titles) => {
        expect($titles.length).to.eq(2)
        $titles.each((_index, el) => {
          expect(el.textContent.toLowerCase()).to.include('rick')
        })
      })
    })

    it('shows a message when a search has no matches', () => {
      cy.get('input[type="search"]').type('nomatch')
      cy.wait('@charactersApi')
      cy.contains('No characters match')
    })
  })
})

// Verifies the catch-all character detail route (/characters/:id) renders full info.
// Stubbed for the same reason as above: isolates this from live API flakiness.
describe('Character detail page', () => {
  it('shows full character info for a character', () => {
    cy.intercept('GET', '**/api/character/1', {
      statusCode: 200,
      body: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: { name: 'Earth (C-137)' },
        location: { name: 'Citadel of Ricks' },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/1'],
      },
    }).as('getCharacter')

    cy.visit('/characters/1')
    cy.wait('@getCharacter')

    cy.contains('h1', 'Rick Sanchez')
    cy.contains('Status:')
    cy.contains('Species:')

    cy.contains('a', 'Back to search').click()
    cy.url().should('include', '/characters')
  })
})
