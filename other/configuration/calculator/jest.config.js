module.exports = {
  displayName: 'calculator',
  testEnvironment: 'jsdom',
  setupTestFrameworkScriptFile: require.resolve(
    './test/setup-test-framework.js',
  ),
  moduleNameMapper: {
    /** notes: configuration to load css since node only knows how to load js, it will try to load everything as js if below configurations are not defined.
     * everytime css file is found, load a dummy file style-mock.js file instead
     * style-mock.js can load other modules for e.g. to handle svg files
     * testEnvironment should be set to jsdom if jest js files have DOM elements (e.g. document.createElement)
     * redirects any import statement with module.css to identity-obj-proxy library which will resolve es6 import statement
     * redirects any .css file to style-mock js to prevent node from trying to parse it as a js file
     *
     * notes: configurations for code coverage:
     * can set default coverage thresholds as below:
     * branches  = if statement (consequent) and else (alternate)
     *
     */
    // module must come first
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock'),
    // can also map files that are loaded by webpack with the file-loader
  },
  // normally you'd put this here
  // collectCoverageFrom: ['**/src/**/*.js'],
}

// however, that kinda messes up my setup in this workshop repo
// so I'm doing this weird thing. Basically ignore this and just
// do it inline like I show above :)
if (process.cwd() === __dirname) {
  Object.assign(module.exports, {
    collectCoverageFrom: ['**/src/**/*.js'],
    coverageThreshold: {
      global: {
        statements: 17,
        branches: 8,
        functions: 20,
        lines: 17,
      },
    },
  })
}
