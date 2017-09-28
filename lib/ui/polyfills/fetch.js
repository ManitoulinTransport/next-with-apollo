import fetch from 'isomorphic-fetch'

if (!process.browser) {
  global.fetch = fetch
}
