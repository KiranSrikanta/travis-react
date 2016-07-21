/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var WebpackTestConfig = require('./webpack.config.test.js');

process.env.NODE_ENV = 'test';

module.exports = function (config) {
  config.set({
    browsers: ['Chrome', 'IE'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    // karma only needs to know about the test bundle
    files: [
      'tests.bundle.js'
    ],
    frameworks: ['chai', 'sinon-stub-promise', 'sinon-chai', 'mocha'],
    plugins: [
      'karma-chrome-launcher',
      'karma-ie-launcher',
      'karma-chai-plugins',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-sinon-stub-promise'
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      'tests.bundle.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    singleRun: true,
    // webpack config object
    webpack: WebpackTestConfig,
    webpackMiddleware: {
      noInfo: true,
    }
  });
  if (process.env.TRAVIS) {
    config.browsers = ['Chrome_travis_ci'];
  }
};