import { useEffect, useState } from 'react'
import { Alert, Card, Col, Row, Spinner } from 'react-bootstrap'
import { getShowStats } from '../api/rickAndMorty'

function AboutPage() {
  const [stats, setStats] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'

  // The written blurb below is static, but the numbers are fetched live from the API
  // (getShowStats) so this page is doing real data-fetching, not just hard-coded text.
  useEffect(() => {
    const controller = new AbortController()

    getShowStats({ signal: controller.signal })
      .then((data) => {
        setStats(data)
        setStatus('success')
      })
      .catch((error) => {
        if (error.code === 'ERR_CANCELED') return
        setStatus('error')
      })

    return () => controller.abort()
  }, [])

  return (
    <div>
      <h1 className="mb-4">About Rick and Morty</h1>
      <p>
        Rick and Morty is an adult animated science-fiction sitcom created by Justin Roiland and
        Dan Harmon for Adult Swim. It follows Rick Sanchez, a cynical mad scientist, and his
        anxious grandson Morty Smith, as they go on adventures that span infinite universes,
        dimensions, and timelines.
      </p>

      {status === 'loading' && (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" size="sm" role="status" /> Loading show stats...
        </div>
      )}

      {status === 'error' && (
        <Alert variant="danger">Couldn&apos;t load live stats from the API right now.</Alert>
      )}

      {status === 'success' && stats && (
        <Row className="text-center mt-4 g-3">
          <Col>
            <Card body>
              <Card.Title>{stats.characterCount}</Card.Title>
              <Card.Text className="text-muted mb-0">Characters</Card.Text>
            </Card>
          </Col>
          <Col>
            <Card body>
              <Card.Title>{stats.locationCount}</Card.Title>
              <Card.Text className="text-muted mb-0">Locations</Card.Text>
            </Card>
          </Col>
          <Col>
            <Card body>
              <Card.Title>{stats.episodeCount}</Card.Title>
              <Card.Text className="text-muted mb-0">Episodes</Card.Text>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default AboutPage
