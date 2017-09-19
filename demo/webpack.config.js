const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './demo/app.js',
    css: './demo/app.scss'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['ng-annotate-loader', 'babel-loader'],
        parser: { amd: false }
      },
      {
        test: /\.html$/,
        loader: `html-loader`,
      },
      {
        test: /\.(css)$/,
        include: [/react-toolbox/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'postcss-loader'
        ],
      },
      {
        test: /\.(css|scss)$/,
        exclude: [/react-toolbox/],
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
    contentBase: './'
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