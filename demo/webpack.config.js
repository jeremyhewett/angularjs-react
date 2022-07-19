const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './demo/app.js',
    css: './demo/app.scss'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        parser: { amd: false }
      },
      {
        test: /\.html$/,
        loader: `html-loader`,
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    static: [path.join(__dirname, '.')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./demo/index.html`,
      inject: true,
      minify: false,
    })
  ],
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name].bundle.js',
  }
};
