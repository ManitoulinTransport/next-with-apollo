import './polyfills/fetch'
import * as httpClient from 'http-client'
import { origin } from './constants'

// Define a reusable stack of middlewares for our fetch functions
// TODO: Move somewhere suitable for reuse
const commonStack = httpClient.createStack(
  // Every request to the API needs the following 2 middlewares
  httpClient.base(`${origin}/api/rest`),
  httpClient.init('credentials', 'include')
)
// Helper function for POST requests with JSON request & response bodies
// TODO: Make a PR to `http-client`
function createJsonFetch (stack) {
  const fetch = httpClient.createFetch(
    stack,
    httpClient.method('POST'),
    httpClient.header('Content-Type', 'application/json')
  )
  return (url, options = {}) => (body = {}) =>
    fetch(url, { ...options, body: JSON.stringify(body) }).then(res =>
      res.json()
    )
}

const fetch = createJsonFetch(commonStack)

export const loginWithUsernameAndPassword = fetch(
  '/auth/login/usernameAndPassword'
)

export const logout = fetch('/auth/logout')
