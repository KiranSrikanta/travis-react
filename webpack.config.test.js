/* eslint-disable */
var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src/client/app');

module.exports = {
  devtool: 'inline-source-map',
  noInfo: true,
  module: {
    loaders: [
      { test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.eot$/, loader: "file" },
      { test: /\.woff$/, loader: "file" },
      { test: /\.woff2$/, loader: "file" },
      { test: /\.ttf$/, loader: "file" },
      { test: /\.svg$/, loader: 'svg-inline' }
    ]
  }
};