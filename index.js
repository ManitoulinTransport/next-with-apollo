// TODO: Update dependencies in package.json
const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express') // TODO: Change to `apollo-server-express`
const next = require('next')
const bodyParser = require('body-parser')
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

  // Apollo request handlers
  server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
  if (config.isDev) {
    server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  }

  // Next.js request handler
  server.get('*', app.getRequestHandler())

  // Start server
  await pCall(server, 'listen', config.port)

  // Voila
  console.log(`> Ready on http://localhost:${config.port}`)
}
