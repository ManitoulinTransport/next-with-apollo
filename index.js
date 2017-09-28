// TODO: Update dependencies in package.json
// TODO: Use `eslint-plugin-graphql`
// TODO: Use `compression`
// TODO: Modularize (api vs ui; components for reuse across projects)
const express = require('express')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const sessionFileStore = require('session-file-store')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express') // TODO: Change to `apollo-server-express`
const next = require('next')
const bodyParser = require('body-parser')
const passport = require('./lib/api/passport')
const schema = require('./schema/index')
const pCall = require('./lib/pCall')
const config = require('./config')

main()

async function main () {
  // Create the Next.js app
  const app = next({ dev: config.isDev })
  await app.prepare()

  // Create the express server
  const server = express()

  // Don't respond with `x-powered-by` http header (keep our framework a secret from attackers)
  server.disable('x-powered-by')

  // Session and Authentication middlewares
  server.use(
    '/api',
    cookieParser(),
    expressSession({
      // TODO: Use a mysql based session store
      store: new (sessionFileStore(expressSession))({
        path: '.sessions',
        ttl: 3600, // 1 hour
      }),
      secret: '453KJHG7986da^(*)a3h52amvVSAD325hSHafKMNAS35aFsf/',
      name: 'sessionId',
      resave: false,
      saveUninitialized: false,
    }),
    passport.initialize(),
    passport.session()
  )

  // Request handler for debugging server state
  if (config.isDev) {
    server.get('/api/rest/debug', (req, res) => {
      const { session, user } = req
      res.json({ session, user })
    })
  }

  // Authentication (i.e. login and logout) request handlers
  server.post(
    '/api/rest/auth/login/usernameAndPassword',
    bodyParser.json(),
    (req, res, next) => {
      passport.authenticate('usernameAndPassword', (error, user, info) => {
        if (error) {
          next(error)
        } else if (!user) {
          res.send({ success: false, message: info.message })
        } else {
          req.logIn(user, error => {
            if (error) {
              next(error)
            } else {
              res.send({ success: true })
            }
          })
        }
      })(req, res, next)
    }
  )
  server.post('/api/rest/auth/logout', (req, res, next) => {
    req.logOut()
    res.send({ success: true })
  })

  // Apollo request handlers
  server.use(
    '/api/graphql',
    bodyParser.json(),
    graphqlExpress(req => {
      const context = {
        user: req.user || null,
      }
      return { schema, context }
    })
  )
  if (config.isDev) {
    server.use(
      '/api/graphiql',
      graphiqlExpress({ endpointURL: '/api/graphql' })
    )
  }

  // Next.js request handler
  server.get('*', app.getRequestHandler())

  // Start server
  await pCall(server, 'listen', config.port)

  // Voila
  console.log(`> Ready on http://localhost:${config.port}`)
}
