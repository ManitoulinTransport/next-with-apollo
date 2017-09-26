import App from '../components/App'
import Header from '../components/Header'
import UserList from '../components/UserList'
import withApollo from '../lib/ui/withApollo'

export default withApollo(props => (
  <App>
    <Header pathname={props.url.pathname} />
    <UserList />
  </App>
))
