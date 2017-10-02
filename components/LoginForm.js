import React from 'react'
import { withApollo } from 'react-apollo'
import { login } from '../framework/ui/auth'

class LoginForm extends React.Component {
  render () {
    return (
      <form onSubmit={this.handleLogin.bind(this)}>
        <input type='text' placeholder='Username' name='username' />
        <br />
        <input type='password' placeholder='Password' name='password' />
        <br />
        <button>Log in</button>
      </form>
    )
  }
  async handleLogin (event) {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    const result = await
      login(this.props.client, 'usernameAndPassword', {
        username,
        password,
      })
    if (result.message) {
      window.alert(result.message)
    }
  }
}

export default withApollo(LoginForm)
