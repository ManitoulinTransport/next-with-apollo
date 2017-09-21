const {promisify} = require('util')
const fs = require('fs')
const path = require('path')
const {makeExecutableSchema} = require('graphql-tools')
const resolvers = require('./resolvers')

const readFile = promisify(fs.readFile)

module.exports = async function getSchema() {
    const typeDefs = await readFile(path.join(__dirname, 'typeDefs.graphql'), 'utf8')
    return makeExecutableSchema({ typeDefs, resolvers })
}
