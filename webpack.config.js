/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'src/client/public/assets');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

// webpack options
module.exports = {
  debug: false,
  entry: {
    bundle: APP_DIR + '/main.js'
    //common: ["react", "redux", "react-redux"]
  },
  output: {
    publicPath: '/assets/',
    path: BUILD_DIR,
    filename: '[name].min.js',
    chunkFilename: 'bundle.[name].min.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js?$/, include: APP_DIR, loader: 'babel' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.eot$/, loader: "file" },
      { test: /\.woff$/, loader: "file" },
      { test: /\.woff2$/, loader: "file" },
      { test: /\.ttf$/, loader: "file" },
      { test: /\.svg$/, loader: 'svg-inline' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("bundle.min.css"),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
    }),
    //new webpack.optimize.CommonsChunkPlugin({name: 'common'}),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};