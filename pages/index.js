import App from '../components/App'
import Header from '../components/Header'
import UserList from '../components/UserList'
import withFramework from '../framework/ui/withFramework'

export default withFramework(({ url, currentUser }) => (
  <App>
    <Header url={url} currentUser={currentUser} />
    <UserList />
  </App>
))
