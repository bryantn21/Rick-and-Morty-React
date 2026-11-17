import axios from 'axios'

// Thin wrapper around the public Rick and Morty REST API (https://rickandmortyapi.com/documentation).
// Using axios (instead of fetch) so every call gets consistent JSON parsing and error
// handling via axios's response/error shape, as suggested by the project requirements.
const BASE_URL = 'https://rickandmortyapi.com/api'

// Fetches a page of characters, optionally filtered by name.
// Returns { info, results } on success. The API responds 404 when a search has no matches,
// so we treat that case as "zero results" instead of an error.
// `signal` (an AbortController's signal) lets the caller cancel this request if, e.g.,
// the user types another search character before this one's response comes back --
// otherwise every keystroke's request keeps running and can arrive out of order.
export async function getCharacters({ name = '', page = 1, signal } = {}) {
  const params = {}
  if (name) params.name = name
  if (page) params.page = page

  try {
    const response = await axios.get(`${BASE_URL}/character`, { params, signal })
    return response.data
  } catch (error) {
    if (error.response?.status === 404) {
      return { info: null, results: [] }
    }
    throw error
  }
}

// Fetches a single character by id for the detail page.
export async function getCharacterById(id, { signal } = {}) {
  const response = await axios.get(`${BASE_URL}/character/${id}`, { signal })
  return response.data
}

// Pulls live counts from the character/location/episode endpoints so the About page
// can show real numbers about the show instead of hard-coded text.
export async function getShowStats({ signal } = {}) {
  const [characters, locations, episodes] = await Promise.all([
    axios.get(`${BASE_URL}/character`, { signal }),
    axios.get(`${BASE_URL}/location`, { signal }),
    axios.get(`${BASE_URL}/episode`, { signal }),
  ])

  return {
    characterCount: characters.data.info.count,
    locationCount: locations.data.info.count,
    episodeCount: episodes.data.info.count,
  }
}
