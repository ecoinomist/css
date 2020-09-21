const withPlugins = require('next-compose-plugins')
const {modulesToTranspile} = require('../../config')
module.exports = withPlugins(
  // Next.js plugins
  [
    require('next-transpile-modules')([
      // pass the modules you would like to see transpiled
      'core',
      ...modulesToTranspile
    ]),
    require('@zeit/next-css'),
  ],

  // next.config.js configuration
  {
    publicRuntimeConfig: {
      NODE_ENV: process.env.NODE_ENV
    }
  }
)
