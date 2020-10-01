const merge = require('lodash/merge');
const path = require('path');
const commonWebpackConfig = require('../scripts/webpack-config/common-webpack.config');

const config = {
  context: path.resolve(__dirname, '..'),
  mode: 'development',
};

module.exports = merge(commonWebpackConfig, config);
