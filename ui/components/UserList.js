import apolloData from '../lib/apolloData'
import ErrorMessage from './ErrorMessage'

const UserListData = apolloData(
  `query UserListQuery {
    users {
      id
      company
      username
      firstName
      lastName
    }
  }`
)

export default function UserList () {
  return (
    <UserListData
      options={{ pollInterval: 1000 }}
      render={({ loading, error, users }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <ErrorMessage message='Error loading users.' />
        return (
          <div>
            {users.map(user => (
              <div key={user.id}>
                {user.username} ({user.firstName} {user.lastName})
                {' - '}
                {user.company}
              </div>
            ))}
          </div>
        )
      }}
    />
  )
}
