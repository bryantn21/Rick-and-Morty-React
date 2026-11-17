# Rick and Morty Explorer

A React + Vite app for browsing and searching characters from the Rick and Morty
show, built on top of the public [Rick and Morty API](https://rickandmortyapi.com/).

## Features

- **Home** (`/`) — landing page with links to the other pages.
- **Characters** (`/characters`) — searches the API by name (debounced) and renders
  a Bootstrap `Card` for every character, with pagination.
- **Character detail** (`/characters/:id`) — full info for a single character.
- **About** (`/about`) — a blurb about the show plus live stats (character,
  location, and episode counts) pulled from the API.
- **404 page** — a catch-all route renders `NotFound.jsx` for any URL that doesn't
  match a page. This is separate from the router's `errorElement`
  (`ErrorPage.jsx`), which only renders if a route actually throws while
  rendering or loading data.

## Stack

- React 19 + Vite
- React Router (`react-router`, not `react-router-dom`)
- React-Bootstrap + Bootstrap CSS
- Axios for API calls
- Cypress for end-to-end tests

## Setup

```sh
npm install
npm run dev
```

Then open the printed `localhost` URL.

## Testing

```sh
npm run test:e2e      # starts the dev server and runs the Cypress suite headlessly
npm run cypress:open  # interactive Cypress runner (start `npm run dev` separately first)
```

The suite covers navbar navigation, the character Cards/search/pagination, the
character detail page, the About page, and the 404 catch-all route. Most tests
stub the API with `cy.intercept` for determinism; one test deliberately hits the
real API as a live integration smoke test.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint |
| `npm run test:e2e` | Run the Cypress suite against a freshly started dev server |
| `npm run cypress:open` | Open the interactive Cypress runner |
