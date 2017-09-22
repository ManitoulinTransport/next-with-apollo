// TODO: Change this back to `typeDefs.graphql`
module.exports = `
# Our "user" type
type User {
    # The subsidiary company the user belongs to
    company: String!
    username: String!
    firstName: String!
    lastName: String!
}

type Query {
    users: [User]
}
`
