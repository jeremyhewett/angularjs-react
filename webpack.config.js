const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    library: 'directify',
    libraryTarget: 'umd',
  },
  externals: {
    react: 'react',
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM', // indicates global variable
    },
    angular: 'angular',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource'
      },
    ],
  },
};
