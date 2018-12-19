// eslint-disable-next-line import/no-extraneous-dependencies
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

const config = require('../config');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    port: config.clientPort,

    // Fixes issue with webpack-dev-server not being able to load Push-State
    // URL (e.g. react-router's BrowserRouter) when refreshing the page.
    historyApiFallback: true,
  },
});
