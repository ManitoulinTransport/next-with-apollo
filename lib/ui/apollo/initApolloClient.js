import '../polyfills/fetch' // used by ApolloClient
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { origin } from '../constants'

let apolloClient = null

function create ({ initialState, requestCookie } = {}) {
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

export default function initApolloClient (options) {
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
