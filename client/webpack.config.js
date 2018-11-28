const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'src/index.html'),
  filename: './index.html',
});

module.exports = {
  mode: 'development',

  entry: path.join(__dirname, 'src/index.tsx'),

  output: {
    publicPath: '/',
  },

  devtool: 'source-map',

  module: {
    // Note: Order is important, from BOTTOM to TOP!
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        },
      },

      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          /* Loader options go here */
        },
      },

      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },

  plugins: [htmlWebpackPlugin],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  devServer: {
    port: config.clientPort,

    // Fixes issue with webpack-dev-server not being able to load Push-State
    // URL (e.g. react-router's BrowserRouter) when refreshing the page.
    historyApiFallback: true,
  },
};
