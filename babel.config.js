module.exports = (api) => {
  // @Note: Next.js only loads its local repo .babelrc.
  // This 'babel.config.js' is loaded by global Jest test automatically.
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
    babelrcRoots: [
      // Keep the root as a root
      '.',

      // Also consider monorepo packages "root" and load their .babelrc files.
      './repos/*'
    ],

    // May be required for babel to transform packages outside of current working directory (for each repo)
    // @Note: commented out because:
    //  - Jest test uses `transformIgnorePatterns` inside jest.config.js
    //  - Next.js uses its own next.config.js to exclude ignore node_modules
    // ignore: [
    //   /node_modules\/(?!(@babylonjs|react-ui-pack|utils-pack)\/)/
    // ],
  }
}
