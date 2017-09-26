const sha1 = require('sha1')

const usersWithoutIds = [
  {
    company: 'MANITOULIN',
    username: 'mbrunetti',
    type: 'ADMIN',
    firstName: 'Matthew1111',
    lastName: 'Brunetti',
    activeDirectoryDomain: 'SECURE.MANITOULINTRANSPORT.COM',
    encryptedPassword: null,
  },
  {
    company: 'MULTIMODAL',
    username: 'mbrunetti',
    type: 'CUSTOMER',
    firstName: 'Matthew2222',
    lastName: 'Brunetti',
    activeDirectoryDomain: 'SECURE.MANITOULINTRANSPORT.COM',
    encryptedPassword: null,
  },
  {
    company: 'MANITOULIN',
    username: 'bwright',
    type: 'EMPLOYEE',
    firstName: 'Beverly3333',
    lastName: 'Wright',
    activeDirectoryDomain: null,
    encryptedPassword: sha1('1234'),
  },
]

setInterval(() => {
  usersWithoutIds.forEach(user => {
    user.firstName = user.firstName.replace(
      /[0-9]*$/,
      String(Math.trunc(Math.random() * Math.pow(10, 4)))
    )
  })
}, 1000)

const getUsersWithIds = () => {
  return usersWithoutIds.map(user => ({
    ...user,
    id: `${user.company}:${user.username}`,
  }))
}

module.exports = {
  async list (viewer) {
    let result = getUsersWithIds()
    if (!viewer || viewer.type !== 'ADMIN') {
      result = result.map(user => ({...user, company: 'redacted'}))
    }
    return result
  },
  async get (viewer, id) {
    return getUsersWithIds().find(user => user.id === id)
  },
}
