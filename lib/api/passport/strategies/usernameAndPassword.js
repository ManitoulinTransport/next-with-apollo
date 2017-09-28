const passportLocal = require('passport-local')
const ActiveDirectory = require('activedirectory')
const sha1 = require('sha1')
const pCall = require('../../../pCall')
const userData = require('../../../../data/user') // TODO: Referencing a data object so far into lib/ feels dirty... make it a config?

const activeDirectoryCache = {}
function getActiveDirectory (host) {
  if (host === 'SECURE.MANITOULINTRANSPORT.COM') {
    host = '10.3.0.49' // As per Sean, this is the server we should be using
  }
  if (!activeDirectoryCache[host]) {
    activeDirectoryCache[host] = new ActiveDirectory({ url: `ldap://${host}` })
  }
  return activeDirectoryCache[host]
}

async function authenticate (username, password) {
  // TODO: not hard-code company names
  // TODO: Use a constant like SUPERUSER (Symbol type) instead of Infinity
  const user = await userData.get(Infinity, `MANITOULIN:${username}`)
  if (!user) {
    return [false, { message: 'Invalid username' }]
  } else {
    let isPasswordValid
    if (user.activeDirectoryDomain) {
      const activeDirectory = getActiveDirectory(user.activeDirectoryDomain)
      let activeDirectoryResult, activeDirectoryError
      try {
        activeDirectoryResult = await pCall(
          activeDirectory,
          'authenticate',
          `${username}@${user.activeDirectoryDomain}`,
          password
        )
      } catch (error) {
        activeDirectoryError = error
      }
      if (activeDirectoryError) {
        if (activeDirectoryError.name === 'InvalidCredentialsError') {
          isPasswordValid = false
        } else {
          throw activeDirectoryError
        }
      } else {
        if (activeDirectoryResult !== true) {
          throw new Error(
            `Expected return value from AD authentication to be 'true' but got '${JSON.stringify(
              activeDirectoryResult
            )}'`
          )
        } else {
          isPasswordValid = true
        }
      }
    } else {
      isPasswordValid = sha1(password) === user.encryptedPassword
    }
    return isPasswordValid ? [user] : [false, { message: 'Invalid password' }]
  }
}

module.exports = new passportLocal.Strategy((username, password, done) => {
  authenticate(username, password).then(
    authResult => done(null, ...authResult),
    error => done(error)
  )
})
