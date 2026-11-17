import { Link } from 'react-router'

// Rendered by the router's catch-all route (path: '*' in router.jsx) whenever the
// URL doesn't match any known route. This is deliberately separate from ErrorPage.jsx:
// that one is an `errorElement`, which only renders if a route actually throws while
// rendering or loading data -- a plain "wrong URL" never throws, so it needs its own route.
function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Sorry, this page does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go back home
      </Link>
    </div>
  )
}

export default NotFound
