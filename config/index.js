var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    productionSourceMap: true,
    productionGzip: false,
    bundleAnalizerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9090,
    autoOpenBrowser: true,
    proxyTable: {},
    cssSourceMap: false
  }
}
