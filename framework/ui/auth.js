import './polyfills/fetch'
import * as httpClient from 'http-client'
import Router from 'next/router'
import { origin } from './constants'

// Define a reusable stack of middlewares for our fetch functions
// TODO: Move somewhere suitable for reuse
const commonStack = httpClient.createStack(
  // Every request to the API needs the following 2 middlewares
  httpClient.base(`${origin}/api/rest`),
  httpClient.init('credentials', 'include')
)
// Helper function for POST requests with JSON request & response bodies
// TODO: accept a `fetchFunction` instead of a `stack`, decouple this from httpClient
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

async function resetState (apolloClient) {
  const resetStorePromise = apolloClient.resetStore()
  Router.replace(Router.asPath)
  await resetStorePromise
}

const fetch = createJsonFetch(commonStack)

export async function login (apolloClient, strategy, params) {
  const result = await fetch(`/auth/login/${strategy}`)(params)
  if (result.success) {
    await resetState(apolloClient)
  }
  return result
}

export async function logout (apolloClient) {
  const result = await fetch('/auth/logout')()
  if (result.success) {
    await resetState(apolloClient)
  }
  return result
}
