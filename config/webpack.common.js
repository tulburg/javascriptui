const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

module.exports = {
  entry: [
    paths.instance
  ],
  output: {
    path: paths.build,
    filename: '[name].app.js',
    library: 'js-native',
    libraryTarget: 'umd',
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      // favicon: paths.src + '/images/favicon.png',
      template: paths.src + '/index.html', // template file
      filename: 'index.html', // output file
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
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': paths.src,
      '@core': paths.core,
      assets: paths.public,
    },
    fallback: { "path": require.resolve("path-browserify") }
  },
}
