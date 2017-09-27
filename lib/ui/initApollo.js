import { ApolloClient, createNetworkInterface } from 'react-apollo'
import fetch from 'isomorphic-fetch'
import config from '../../config'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create ({ initialState, requestCookie } = {}) {
  const origin = process.browser
    ? global.location.origin
    : `http://localhost:${config.port}`
  const networkInterface = createNetworkInterface({
    uri: `${origin}/api/graphql`,
    opts: {
      credentials: 'include',
    },
  })
  if (requestCookie) {
    networkInterface.use([
      {
        applyMiddleware (req, next) {
          req.options.headers = req.options.headers || {} // Create the header object if needed.
          req.options.headers.cookie = requestCookie
          next()
        },
      },
    ])
  }
  return new ApolloClient({
    initialState,
    networkInterface,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
  })
}

export default function initApollo (options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(options)
  } else {
    // Reuse client on the client-side
    if (!apolloClient) {
      apolloClient = create(options)
    }
    return apolloClient
  }
}
