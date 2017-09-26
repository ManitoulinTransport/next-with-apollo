const userData = require('../data/user')

module.exports = {
  Query: {
    users (parent, args, context, info) {
      return userData.list(context.user)
    },
  },
}
