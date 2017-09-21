const express = require('express')
const next = require('next')
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express')
const bodyParser = require('body-parser')
const pCall = require('../util/pCall')
const getSchema = require('./schema')

main()

async function main() {
    const port = parseInt(process.env.PORT, 10) || 3000
    const dev = process.env.NODE_ENV !== 'production'
    const app = next({dev})

    const [, schema] = await Promise.all([app.prepare(), getSchema()])

    const server = express()

    server.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
    server.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
    server.get('*', app.getRequestHandler())
    await pCall(server, 'listen', port)

    console.log(`> Ready on http://localhost:${port}`)
}
