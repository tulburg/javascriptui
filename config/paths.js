const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),
  instance: path.resolve(__dirname, '../node_modules/@js-native/core/dist/index.js'),
  core: path.resolve(__dirname, 'node_modules/@js-native/core')
}
