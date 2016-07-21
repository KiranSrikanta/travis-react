/* eslint-disable */
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public/assets');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

// webpack options
module.exports = {
  entry: {
    bundle: [APP_DIR + '/main.js', 'webpack-hot-middleware/client']
  },
  output: {
    publicPath: '/assets/',
    path: BUILD_DIR,
    filename: '[name].min.js',
    chunkFilename: 'bundle.[name].min.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.js?$/, include: APP_DIR, loader: 'babel' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.eot$/, loader: "file" },
      { test: /\.woff$/, loader: "file" },
      { test: /\.woff2$/, loader: "file" },
      { test: /\.ttf$/, loader: "file" },
      { test: /\.svg$/, loader: 'svg-inline' }
    ]
  },
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin('common.min.js'),
    new webpack.HotModuleReplacementPlugin()
  ]
};