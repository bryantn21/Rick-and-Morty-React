import { Button, Stack } from 'react-bootstrap'
import { Link } from 'react-router'

// The landing page at "/". The actual character search/grid now lives at
// "/characters" (CharactersPage.jsx) so this page can just welcome visitors
// and point them toward the two other pages.
function HomePage() {
  return (
    <Stack gap={3} className="text-center py-5">
      <h1>Welcome to the Rick and Morty Explorer</h1>
      <p className="lead">
        Search and browse every character from the show, or learn more about it on the About
        page.
      </p>
      <div>
        <Button as={Link} to="/characters" variant="primary" className="me-2">
          Browse Characters
        </Button>
        <Button as={Link} to="/about" variant="outline-secondary">
          About the Show
        </Button>
      </div>
    </Stack>
  )
}

export default HomePage
