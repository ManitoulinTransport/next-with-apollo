const userData = require('../data/user')

module.exports = {
  Query: {
    async users (parent, args, context, info) {
      return userData.list(context.user)
    },
  },
}
