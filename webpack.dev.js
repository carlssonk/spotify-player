const path = require("path")
const common = require("./webpack.common")
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devtool: 'cheap-module-source-map',
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
    ]
  }
})