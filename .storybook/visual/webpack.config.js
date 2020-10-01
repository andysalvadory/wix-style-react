const merge = require('lodash/merge');
const path = require('path');

const { StylableWebpackPlugin } = require('@stylable/webpack-plugin');
const commonWebpackConfig = require('../../scripts/webpack-config/common-webpack.config');

module.exports = ({ config }) => {
  config.module.rules = commonWebpackConfig.module.rules;
  config.plugins.push(new StylableWebpackPlugin());

  const srcPath = path.resolve(__dirname, '../..', 'src');

  return merge(config, {
    context: srcPath,
    resolve: {
      alias: {
        'wix-style-react': srcPath,
      },
    },
  });
};
