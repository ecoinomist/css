module.exports = (api) => {
  // @Note: Next.js only loads .babelrc for its local repo.
  // Use 'babel.config.js' so Next.js will load it for sibling repos using Yarn workspace.
  // Tested with Node 10.15.3
  // console.log('⚡ babel.config.js loaded!')

  api.cache(false) // set cache as true/false

  return {
    presets: [
      'next/babel'
    ],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          'legacy': true
        }
      ],
      // 'import-graphql',
    ],
  }
}
