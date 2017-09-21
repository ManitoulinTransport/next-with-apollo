const express = require('express')
const next = require('next')
const pCall = require('../util/pCall')

main()

async function main () {
    const port = parseInt(process.env.PORT, 10) || 3000
    const dev = process.env.NODE_ENV !== 'production'

    const app = next({dev})
    await app.prepare()

    const server = express()
    server.get('/hello', (req, res) => res.end('hello world'))
    server.get('*', app.getRequestHandler())
    await pCall(server, 'listen', port)

    console.log(`> Ready on http://localhost:${port}`)
}
