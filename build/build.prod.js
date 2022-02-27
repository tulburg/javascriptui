/* eslint-disable */
var path = require('path')
const merge = require('webpack-merge');
const common = require('../webpack.config.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../lib/core/instance.js'),
  target: 'web',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true
    })
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.js',
    library: 'js-native',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader' }, 
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.(png|svg|jpg|gif)$/, loader: 'file-loader' },
      { test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.css$/, use: [{ loader: 'style-loader/url' }, { loader: 'file-loader' }] }
    ]
  }
};