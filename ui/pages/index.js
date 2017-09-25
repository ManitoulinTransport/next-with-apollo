import App from '../components/App'
import Header from '../components/Header'
import UserList from '../components/UserList'
import withData from '../lib/withData'

export default withData(props => (
  <App>
    <Header pathname={props.url.pathname} />
    <UserList />
  </App>
))
