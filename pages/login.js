import React from 'react'
import App from '../components/App'
import Header from '../components/Header'
import LoginForm from '../components/LoginForm'
import withFramework from '../framework/ui/withFramework'
import redirect from '../framework/ui/redirect'

export default withFramework(
  class extends React.Component {
    static async getInitialProps (context) {
      if (context.currentUser) {
        redirect(context, '/')
      }
    }
    render () {
      return (
        <App>
          <Header url={this.props.url} currentUser={this.props.currentUser} />
          <LoginForm />
        </App>
      )
    }
  }
)
