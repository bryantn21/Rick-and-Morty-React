import { Outlet } from 'react-router'
import NavBar from './components/NavBar'

// App is now the shared page layout: the NavBar renders on every route, and
// <Outlet /> is where React Router drops in whichever page matched the URL
// (HomePage, CharacterDetailPage, etc. -- see router.jsx).
function App() {
  return (
    <>
      <NavBar />
      <main className="container pb-5">
        <Outlet />
      </main>
    </>
  )
}

export default App
