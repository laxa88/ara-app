// eslint-disable-next-line import/no-extraneous-dependencies
import merge from 'webpack-merge';

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
});
