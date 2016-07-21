/* eslint-disable */
var webpack = require('webpack');
var path = require('path');

var TEST_DIR = path.resolve(__dirname, 'src/client/tests');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: true,
  babel: {
    presets: ['es2015', 'react']
  },
  isparta: {
      embedSource: true,
      noAutoWrap: true,
      // these babel options will be passed only to isparta and not to babel-loader
      babel: {
          presets: ['es2015', 'react']
      }
  },
  module: {
    loaders: [
      { test: /\.js?$/, include: [TEST_DIR, APP_DIR], loader: 'babel' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.eot$/, loader: "file" },
      { test: /\.woff$/, loader: "file" },
      { test: /\.woff2$/, loader: "file" },
      { test: /\.ttf$/, loader: "file" },
      { test: /\.svg$/, loader: 'svg-inline' }
    ],
    preLoaders: [ 
      {
        test: /\.js$/,
        exclude: [
            path.resolve('src/components/'),
            path.resolve('node_modules/')
        ],
        loader: 'babel'
      },
      {
        test: /\.js$/,
        include: path.resolve('src/client/app'),
        loader: 'isparta'
      }
    ]
  }
};