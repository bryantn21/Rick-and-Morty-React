import { Link, isRouteErrorResponse, useRouteError } from 'react-router'

// Rendered by React Router via the root route's `errorElement`, only when a route
// actually throws while rendering or loading data (e.g. a bug, a bad response). A
// URL that simply doesn't match any route never throws, so that case is handled
// separately by NotFound.jsx through the catch-all `path: '*'` route in router.jsx.
function ErrorPage() {
  const error = useRouteError()
  const isRouteError = isRouteErrorResponse(error)

  const title = isRouteError ? `${error.status} ${error.statusText}` : 'Unexpected Error'
  const message = isRouteError
    ? error.statusText || 'Something went wrong handling that request.'
    : error?.message || 'Something went wrong.'

  return (
    <div className="container text-center py-5">
      <h1 className="display-4">{title}</h1>
      <p className="lead">{message}</p>
      <Link to="/" className="btn btn-primary">
        Go back home
      </Link>
    </div>
  )
}

export default ErrorPage
