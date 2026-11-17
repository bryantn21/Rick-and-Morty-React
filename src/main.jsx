import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
// Bootstrap's CSS must load before our own index.css so that any of our
// overrides below still win out over Bootstrap's defaults.
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import router from './router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
