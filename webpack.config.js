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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
  ],

  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },

  eslint: {
    failOnWarning: true,
    failOnError: true
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