const withPlugins = require('next-compose-plugins')
const path = require('path')
const modulesToTranspileResolve = [ // modules you would like to see transpiled and resolved to `/src` folder
  'modules-pack',
  'react-ui-pack',
  'utils-pack'
]
module.exports = withPlugins(
  // Next.js plugins
  [
    require('next-transpile-modules')(modulesToTranspileResolve),
    require('@zeit/next-css'),
  ],

  // next.config.js configuration
  {
    webpack (config) {
      modulesToTranspileResolve.forEach(pkg => config.resolve.alias[pkg] = path.resolve(__dirname, `../${pkg}/src`))
      return config
    },
    publicRuntimeConfig: {
      NODE_ENV: process.env.NODE_ENV
    }
  }
)
