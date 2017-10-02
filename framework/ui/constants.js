import config from '../../config'

export const origin = process.browser
  ? global.location.origin
  : `http://localhost:${config.port}`
