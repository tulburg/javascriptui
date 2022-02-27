'use strict'

var path = require('path')
var opn = require('opn')
var config = require('../config')
var webpack = require('webpack')
var webpackConfig = require('../webpack.config.js')
var compiler = webpack(webpackConfig);
var express = require('express')

var port = process.env.PORT || config.dev.port
var autoOpenBrowser = !!config.dev.autoOpenBrowser

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var app = express()
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.pubicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  hot: true,
  heartbeat: 2000,
  path: '/__webpack_hmr'
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    if(cb) cb()
  })
})

app.use(devMiddleware)
app.use(hotMiddleware)

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
)

var uri = 'http://localhost:' + port;
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    // opn(uri)
  }
  _resolve()
})

var server = app.listen(port)
