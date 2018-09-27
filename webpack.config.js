const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "src/index.html"),
  filename: "./index.html",
});

module.exports = {
  mode: "development",

  entry: path.join(__dirname, "src/index.js"),

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
    ],
  },

  plugins: [htmlWebpackPlugin],

  resolve: {
    extensions: [".js", ".jsx"],
  },

  devServer: {
    port: 3001,
  },
};
