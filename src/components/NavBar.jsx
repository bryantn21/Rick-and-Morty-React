import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router'

// React-Bootstrap's Nav.Link normally renders a plain <a>, which would do a full
// page reload on click. Passing `as={NavLink}` makes it render React Router's
// NavLink instead, so clicking actually does client-side navigation and the
// current page gets an "active" class automatically.
function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" className="mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Rick and Morty Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/characters">
              Characters
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
