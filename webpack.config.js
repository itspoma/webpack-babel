'use strict';

const ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
  context: __dirname + '/src/pages',
  entry: {
    landing: './landing.js',
    about: './about.js'
  },

  output: {
    path: __dirname + '/web/assets',
    filename: '[name].min.js',
    library: '[name]'
  },

  watch: ENV == 'development',

  plugins: [
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  }
}

if (ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}