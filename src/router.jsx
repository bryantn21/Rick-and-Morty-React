import { createBrowserRouter } from 'react-router'
import App from './App.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CharacterDetailPage from './pages/CharacterDetailPage.jsx'
import CharactersPage from './pages/CharactersPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement only catches a route that actually throws while rendering/loading.
    // A URL that simply doesn't match any route below is caught by the '*' route instead.
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'characters', element: <CharactersPage /> },
      { path: 'characters/:id', element: <CharacterDetailPage /> },
      { path: 'about', element: <AboutPage /> },
      // Catch-all: matches any URL that didn't match one of the routes above.
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router
