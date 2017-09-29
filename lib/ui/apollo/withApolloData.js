import React from 'react'
import PropTypes from 'prop-types'
import { gql, ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import initApolloClient from './initApolloClient'
import initReduxStore from './initReduxStore'

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName (Component) {
  return Component.displayName || Component.name || 'Unknown'
}

async function getCurrentUser (apolloClient) {
  const queryResult = await apolloClient.query({
    query: gql`
      query {
        currentUser {
          id
          company
          username
          type
        }
      }
    `,
  })
  return queryResult.data.currentUser
}

export default function withApolloData (ComposedComponent) {
  return class WithApolloData extends React.Component {
    static displayName = `WithApolloData(${getComponentDisplayName(
      ComposedComponent
    )})`
    static propTypes = {
      serverState: PropTypes.object.isRequired,
    }

    static async getInitialProps (context) {
      let serverState = {}

      // Setup a one-time-use apollo client for initial props, and (server-side only) extracting serverState
      const apolloClient = initApolloClient({
        requestCookie: context.req && context.req.headers.cookie,
      })
      const reduxStore = initReduxStore({ apolloClient })
      const currentUser = await getCurrentUser(apolloClient)

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps({
          ...context,
          apolloClient,
          reduxStore,
          currentUser,
        })
      }

      // When redirecting, the response is finished.
      // No point in continuing to render
      if (context.res && context.res.finished) {
        return
      }

      // Run all GraphQL queries in the component tree and extract the resulting data
      if (!process.browser) {
        // Mimic the `url` prop that's used when rendering, but exclude the methods
        const url = { query: context.query, pathname: context.pathname }
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            // No need to use the Redux Provider because Apollo sets up the store for us
            <ApolloProvider client={apolloClient} store={reduxStore}>
              <ComposedComponent
                url={url}
                currentUser={currentUser}
                {...composedInitialProps}
              />
            </ApolloProvider>
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          // TODO: Log this
          console.error(error)
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()

        // Extract query data from the store
        serverState = reduxStore.getState()
      }

      return {
        currentUser,
        serverState,
        ...composedInitialProps,
      }
    }

    constructor (props) {
      super(props)
      this.apolloClient = initApolloClient()
      this.reduxStore = initReduxStore({
        apolloClient: this.apolloClient,
        initialState: this.props.serverState,
      })
    }

    render () {
      return (
        // No need to use the Redux Provider because Apollo sets this up for us
        <ApolloProvider client={this.apolloClient} store={this.reduxStore}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
