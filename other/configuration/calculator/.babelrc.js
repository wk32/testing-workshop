const isTest = String(process.env.NODE_ENV) === 'test'
// note:if app runs in test mode, tell babel to compile into commonjs instead of skipping es modules for webpack to treeshake
module.exports = {
  presets: [['env', {modules: isTest ? 'commonjs' : false}], 'react'],
  plugins: [
    'syntax-dynamic-import',
    'transform-class-properties',
    'transform-object-rest-spread',
    isTest ? 'dynamic-import-node' : null,
  ].filter(Boolean),
}

/**
 * Notes:
 * node can't import import css
 * node also can't handle dynamic import out of the box. need to install babel-plugin-dynamic-import to simulate dynamic import as promises
 * .filter(Boolean) filters all the falsy values to prevent babel from crashing when building for production
 */
/*
Solution snippets below
































































const isTest = String(process.env.NODE_ENV) === 'test'


for the env plugin modules config:
isTest ? 'commonjs' : false

For dynamic import config in plugins
isTest ? 'dynamic-import-node' : null
 */
