import React from 'react'
import App from '../components/App'
import Header from '../components/Header'
import withApolloData from '../lib/ui/apollo/withApolloData'
import { loginWithUsernameAndPassword } from '../lib/ui/auth'

export default withApolloData(
  class extends React.Component {
    static async getInitialProps (context, { apolloClient, reduxStore }) {
      // ...
    }
    handleSubmit (event) {
      event.preventDefault()
      const username = event.target.username.value
      const password = event.target.password.value
      loginWithUsernameAndPassword({ username, password })
        .then(result => {
          console.log('result', result)
        })
        .catch(console.error)
    }
    render () {
      return (
        <App>
          <Header pathname={this.props.url.pathname} />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type='text' placeholder='Username' name='username' />
            <br />
            <input type='password' placeholder='Password' name='password' />
            <br />
            <button>Log in</button>
          </form>
        </App>
      )
    }
  }
)
