const usersWithoutIds = [
  {
    company: 'MANITOULIN',
    username: 'mbrunetti',
    firstName: 'Matthew1111',
    lastName: 'Brunetti',
  },
  {
    company: 'MULTIMODAL',
    username: 'mbrunetti',
    firstName: 'Matthew2222',
    lastName: 'Brunetti',
  },
  {
    company: 'MANITOULIN',
    username: 'bwright',
    firstName: 'Beverly3333',
    lastName: 'Wright',
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
  list (viewer) {
    console.log('data/user.js list(viewer)', { viewer })
    return getUsersWithIds()
  },
}
