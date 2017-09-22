import {ApolloClient, createNetworkInterface, graphql} from 'react-apollo'
const {createLocalInterface} = require('apollo-local-query')
import fetch from 'isomorphic-fetch'
const schema = require('../schema') // TODO: Exclude this from client-side bundles !important!

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState) {
  const networkInterface = process.browser
      ? createNetworkInterface({
          uri: `${global.location.origin}/graphql`, // Server URL (must be absolute)
      })
      : createLocalInterface(graphql, schema)
  return new ApolloClient({
    initialState,
    networkInterface,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
