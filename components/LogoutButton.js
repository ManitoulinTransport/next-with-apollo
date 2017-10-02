// TODO: Expose the ApolloClient as `this.props.apolloClient` instead of `this.props.client`
//   See https://github.com/apollographql/react-apollo/issues/1172

import React from 'react'
import { withApollo } from 'react-apollo'
import { logout } from '../framework/ui/auth'

class LogoutButton extends React.Component {
  render () {
    return <button onClick={this.handleLogout.bind(this)}>Log out</button>
  }
  async handleLogout (event) {
    event.preventDefault()
    const result = await logout(this.props.client)
    if (result.message) {
      window.alert(result.message)
    }
  }
}

export default withApollo(LogoutButton)
