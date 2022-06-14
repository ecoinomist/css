const withPlugins = require('next-compose-plugins')
const path = require('path')
const modulesToTranspileResolve = [ // modules you would like to see transpiled and resolved to `/src` folder
  'modules-pack',
  'react-ui-pack',
  'utils-pack'
]
const clientEnvs = {}
for (const key in process.env) {
  if (key.indexOf('REACT_APP_') === 0) clientEnvs[key] = process.env[key]
}
console.warn(clientEnvs)
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
      // import-graphql - requires 'graphql' and 'graphql-tag' packages
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      })
      return config
    },
    publicRuntimeConfig: {
      NODE_ENV: process.env.NODE_ENV,
      ...clientEnvs,
    }
  }
)
