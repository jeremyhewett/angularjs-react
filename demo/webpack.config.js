const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./demo/app.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["ng-annotate-loader", "babel-loader"],
        parser: { amd: false }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          "sass-loader"
        ]
      }
    ],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./demo/index.html`,
      inject: true,
      minify: false,
    })
  ],
  output: {
    filename: "[name].bundle.js",
  }
};