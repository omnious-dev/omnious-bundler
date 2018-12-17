'use strict';

// Global import
const { resolve } = require('path');
const { smart } = require('webpack-merge');

// Local import
const commonConfig = require('./webpack.config.common');

module.exports = (env, { add, mode }) => {
  let mergedConfig = {};

  if (add) {
    const additionalConfig = require(resolve(process.cwd(), add));
    mergedConfig = smart(mergedConfig, additionalConfig);
  }

  switch (env) {
    case 'development': {
      // if (task === 'koa') {
      //   const devConfig = require('./webpack.config.koa');
      //   return smart(commonConfig, devConfig, mergedConfig);
      // }

      const devConfig = require('./webpack.config.dev');
      return smart(commonConfig, devConfig, mergedConfig);
    }
    case 'production': {
      const prodConfig = require('./webpack.config.prod');
      return smart(commonConfig, prodConfig, mergedConfig);
    }
    case 'test':
    default:
      // TODO: config for test
      return {};
  }
};