'use strict';

module.exports = {
  entry: './src/main.js',

  output: {
    path: './dest',
    filename: 'bundle.js'
  },

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