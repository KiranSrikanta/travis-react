/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var WebpackTestConfig = require('./webpack.config.coverage.js');

process.env.NODE_ENV = 'test';

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    // karma only needs to know about the test bundle
    files: [
      'tests.bundle.js'
    ],
    frameworks: [ 'chai', 'sinon-stub-promise', 'sinon-chai', 'mocha' ],
    plugins: [
      'karma-chrome-launcher',
      'karma-chai-plugins',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-sinon-stub-promise',
      'karma-coverage',
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      'tests.bundle.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'coverage' ],
    coverageReporter: {
        type: 'text'
    },
    singleRun: true,
    // webpack config object
    webpack: WebpackTestConfig,
    webpackMiddleware: {
      noInfo: true,
    }
  });
};