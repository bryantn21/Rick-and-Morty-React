import { Badge, Card, Col } from 'react-bootstrap'
import { Link } from 'react-router'

// Maps a character's status to a Bootstrap badge color so it's scannable at a glance.
const STATUS_VARIANT = {
  Alive: 'success',
  Dead: 'danger',
  unknown: 'secondary',
}

function CharacterCard({ character }) {
  const statusVariant = STATUS_VARIANT[character.status] || 'secondary'

  return (
    <Col sm={6} md={4} lg={3} className="mb-4">
      {/* Linking to /characters/:id is what makes this card open the detail page/route */}
      <Link to={`/characters/${character.id}`} className="text-decoration-none text-reset">
        <Card className="h-100 shadow-sm">
          <Card.Img variant="top" src={character.image} alt={character.name} />
          <Card.Body>
            <Card.Title>{character.name}</Card.Title>
            <Card.Text className="mb-2">
              <Badge bg={statusVariant}>{character.status}</Badge>
            </Card.Text>
            <Card.Text className="text-muted small mb-0">{character.species}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}

export default CharacterCard
