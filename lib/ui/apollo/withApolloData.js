// Should stay roughly the same as https://github.com/zeit/next.js/blob/master/examples/with-apollo/lib/withData.js
import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import initApolloClient from './initApolloClient'

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName (Component) {
  return Component.displayName || Component.name || 'Unknown'
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

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(
          context,
          apolloClient
        )
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
            <ApolloProvider client={apolloClient}>
              <ComposedComponent url={url} {...composedInitialProps} />
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

        // Extract query data from the Apollo store
        const state = apolloClient.getInitialState()

        // Only include the Apollo data state
        serverState = { apollo: { data: state.data } }
      }

      return {
        serverState,
        ...composedInitialProps,
      }
    }

    constructor (props) {
      super(props)
      // Browser-side, this call is cached (see initApollo.js) and repeated calls result in the same ApolloClient
      // Server-side, this call results in a new ApolloClient, but...
      //   `this.props.serverState` will already provide all the needed data, so we won't end up repeating requests
      this.apolloClient = initApolloClient({ initialState: this.props.serverState })
    }

    render () {
      return (
        <ApolloProvider client={this.apolloClient}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
