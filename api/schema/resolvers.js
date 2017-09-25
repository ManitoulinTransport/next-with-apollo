const usersWithoutIds = [
  {
    company: 'MANITOULIN',
    username: 'mbrunetti',
    firstName: 'Matthew',
    lastName: 'Brunetti',
  },
  {
    company: 'MULTIMODAL',
    username: 'mbrunetti',
    firstName: 'Matthew',
    lastName: 'Brunetti',
  },
  {
    company: 'MANITOULIN',
    username: 'bwright',
    firstName: 'Beverly',
    lastName: 'Wright',
  },
]

const randomNumber = () => String(Math.trunc(Math.random() * Math.pow(10, 8)))
setInterval(() => {
  usersWithoutIds.push({
    company: randomNumber(),
    username: randomNumber(),
    firstName: randomNumber(),
    lastName: randomNumber(),
  })
}, 1000)

module.exports = {
  Query: {
    users () {
      return usersWithoutIds.map(user => ({
        ...user,
        id: `${user.company}:${user.username}`,
      }))
    },
  },
}
