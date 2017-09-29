const userData = require('../data/user')

module.exports = {
  Query: {
    async currentUser (parent, args, context, info) {
      return userData.getViewer(context.user)
    },
    async users (parent, args, context, info) {
      return userData.list(context.user)
    },
  },
}
