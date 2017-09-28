import React from 'react'
import App from '../components/App'
import Header from '../components/Header'
import withApollo from '../lib/ui/withApollo'
import { loginWithUsernameAndPassword } from '../lib/ui/auth'

export default withApollo(
  class extends React.Component {
    static async getInitialProps (context, apolloClient) {}
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
