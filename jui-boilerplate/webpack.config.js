var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'node_modules/@javascriptui/core/dist/instance.js'),
  target: 'web',
  plugins: [
    new WriteFilePlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: path.resolve(__dirname, 'src/index.html'),
      inject: true
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@src': path.resolve(__dirname, 'src')
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    library: 'javascriptui',
    libraryTarget: 'umd',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.svg$/, type: 'asset/resource' },
      { test: /\.(png|jpg|gif)$/, type: 'asset/resource' },
      { test: /\.(woff(2)?|ttf|eot|svg)?$/, type: 'asset/resource' },
      { test: /\.css$/, use: ['style-loader', 'css-loader' ] }
    ]
  }
};

