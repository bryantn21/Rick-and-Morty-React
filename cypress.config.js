import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // Matches the port Vite's dev server prints when you run `npm run dev`.
    baseUrl: 'http://localhost:5173',
    // These tests hit the real, live Rick and Morty API (no mocking), so give
    // commands extra time to allow for real network latency.
    defaultCommandTimeout: 10000,
  },
})
