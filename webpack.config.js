'use strict';

const ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname + '/src/pages',
  entry: {
    landing: './landing.js',
    about: './about.js',
    styles: './landing'
  },

  output: {
    path: __dirname + '/web/assets',
    filename: '[name].min.js',
    library: '[name]'
  },

  watch: ENV == 'development',

  devtool: "source-map",

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new CleanWebpackPlugin(['web/assets'], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    })
  ],

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
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