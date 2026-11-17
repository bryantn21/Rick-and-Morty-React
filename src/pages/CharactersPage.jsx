import { useEffect, useState } from 'react'
import { Alert, Form, Pagination, Row, Spinner } from 'react-bootstrap'
import { getCharacters } from '../api/rickAndMorty'
import CharacterCard from '../components/CharacterCard'

// How long to wait after the user stops typing before actually calling the API.
const SEARCH_DEBOUNCE_MS = 400

function CharactersPage() {
  const [searchInput, setSearchInput] = useState('') // raw value of the input, updates every keystroke
  const [searchTerm, setSearchTerm] = useState('') // debounced value that's actually sent to the API
  const [page, setPage] = useState(1)
  const [characters, setCharacters] = useState([])
  const [info, setInfo] = useState(null)
  // One status flag drives all of the UI below instead of separate loading/error booleans.
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  // Waits for a pause in typing before committing searchInput to searchTerm, instead
  // of firing an API request on every single keystroke -- fewer wasted requests, and
  // avoids racing a flood of in-flight requests against each other.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1) // jump back to page 1 whenever the search term changes
      setSearchTerm(searchInput)
    }, SEARCH_DEBOUNCE_MS)

    return () => clearTimeout(timeoutId)
  }, [searchInput])

  // Re-run the fetch whenever the debounced search term or page changes.
  useEffect(() => {
    // Cancels this request if, e.g., the page changes again before it resolves.
    const controller = new AbortController()
    setStatus('loading')

    getCharacters({ name: searchTerm, page, signal: controller.signal })
      .then((data) => {
        setCharacters(data.results)
        setInfo(data.info)
        setStatus('success')
      })
      .catch((error) => {
        if (error.code === 'ERR_CANCELED') return // superseded by a newer search/page
        setErrorMessage(error.message)
        setStatus('error')
      })

    return () => controller.abort()
  }, [searchTerm, page])

  return (
    <div>
      <h1 className="mb-4">Rick and Morty Characters</h1>

      <Form.Control
        type="search"
        className="mb-4"
        placeholder="Search characters by name..."
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        aria-label="Search characters by name"
      />

      {status === 'loading' && (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" size="sm" role="status" /> Loading characters...
        </div>
      )}

      {status === 'error' && (
        <Alert variant="danger">Something went wrong: {errorMessage}</Alert>
      )}

      {status === 'success' && characters.length === 0 && (
        <Alert variant="warning">No characters match &quot;{searchTerm}&quot;.</Alert>
      )}

      {status === 'success' && characters.length > 0 && (
        <>
          <Row>
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </Row>

          <Pagination className="justify-content-between">
            <Pagination.Prev
              disabled={!info?.prev}
              onClick={() => setPage((current) => current - 1)}
            />
            <Pagination.Next
              disabled={!info?.next}
              onClick={() => setPage((current) => current + 1)}
            />
          </Pagination>
        </>
      )}
    </div>
  )
}

export default CharactersPage
