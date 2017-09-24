const express = require('express')
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express')
const cors = require('cors')
const bodyParser = require('body-parser')
const schema = require('./schema/index')
const pCall = require('./lib/pCall')

main()

async function main() {
    const port = parseInt(process.env.PORT, 10) || 8080
    const dev = process.env.NODE_ENV !== 'production'

    const server = express()
    server.use(cors())
    server.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
    if (dev) {
        server.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
    }
    await pCall(server, 'listen', port)

    console.log(`> Ready on http://localhost:${port}`)
}
