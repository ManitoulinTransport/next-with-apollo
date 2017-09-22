import { gql, graphql } from 'react-apollo'
import ErrorMessage from './ErrorMessage'

const userListQuery = gql`
  query UserListQuery {
    users {
      id
      company
      username
      firstName
      lastName
    }
  }
`

function UserList ({ data: { loading, error, users } }) {
  if (loading) return <p>Loading...</p>
  if (error) return <ErrorMessage message='Error loading users.' />
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <span>{user.username} ({user.firstName} {user.lastName})</span>
          -
          <span>{user.company}</span>
        </div>
      ))}
    </div>
  )
}

export default graphql(userListQuery, {
  options: {
    pollInterval: 1000,
  },
})(UserList)