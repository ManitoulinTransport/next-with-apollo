module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  isDev: process.env.NODE_ENV !== 'production',
}
