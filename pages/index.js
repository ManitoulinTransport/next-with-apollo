import App from '../components/App'
import Header from '../components/Header'
import UserList from '../components/UserList'
import withApolloData from '../lib/ui/apollo/withApolloData'

export default withApolloData(props => (
  <App>
    <Header pathname={props.url.pathname} />
    <UserList />
  </App>
))
