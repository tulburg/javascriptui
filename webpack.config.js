var path = require('path')
var webpack = require('webpack')
var config = require('./config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&overlay=true&timeout=20000',
    path.resolve(__dirname, './core/dist/index.js')
  ],
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    ignored: ['node_modules', 'resources']
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@core': path.resolve(__dirname, 'node_modules/@js-native/core')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].app.js',
    library: 'js-native',
    libraryTarget: 'umd',
    publicPath: '/'
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin({
      heartbeat: 2000,
      log: false,
      path: '/__webpack_hmr&overlay=true&timeout=20000'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new WriteFilePlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.(png|svg|jpg|gif)$/, loader: 'file-loader' },
      { test: /\.(woff(2)?|ttf|eot|svg)?$/, loader: 'file-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader' ] }
    ]
  }
}
