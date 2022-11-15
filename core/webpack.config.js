const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    main: "./standalone.ts",
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: "jui.js", // <--- Will be compiled to this single file
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: {
        loader: 'ts-loader',
      } }
    ]
  }
};
