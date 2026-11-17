import { useEffect, useState } from 'react'
import { Alert, Button, Col, Image, ListGroup, Row, Spinner } from 'react-bootstrap'
import { Link, useParams } from 'react-router'
import { getCharacterById } from '../api/rickAndMorty'

function CharacterDetailPage() {
  // :id comes from the route path "characters/:id" defined in router.jsx
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')

    getCharacterById(id, { signal: controller.signal })
      .then((data) => {
        setCharacter(data)
        setStatus('success')
      })
      .catch((error) => {
        if (error.code === 'ERR_CANCELED') return // superseded by a newer :id
        setStatus('error')
      })

    return () => controller.abort()
  }, [id])

  if (status === 'loading') {
    return (
      <div className="d-flex align-items-center gap-2">
        <Spinner animation="border" size="sm" role="status" /> Loading character...
      </div>
    )
  }

  if (status === 'error' || !character) {
    return (
      <Alert variant="danger">
        <p>We couldn&apos;t find that character.</p>
        <Button as={Link} to="/characters" variant="primary">
          Back to search
        </Button>
      </Alert>
    )
  }

  return (
    <Row>
      <Col md={4} className="mb-3">
        <Image src={character.image} alt={character.name} fluid rounded />
      </Col>
      <Col md={8}>
        <h1>{character.name}</h1>
        <ListGroup className="mb-3">
          <ListGroup.Item>
            <strong>Status:</strong> {character.status}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Species:</strong> {character.species}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Gender:</strong> {character.gender}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Origin:</strong> {character.origin?.name}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Last known location:</strong> {character.location?.name}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Episode count:</strong> {character.episode?.length}
          </ListGroup.Item>
        </ListGroup>
        <Button as={Link} to="/characters" variant="secondary">
          Back to search
        </Button>
      </Col>
    </Row>
  )
}

export default CharacterDetailPage
