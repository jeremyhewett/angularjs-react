const path = require('path');

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: './src/angularjsReact.js',
  output: {
    filename: 'angularjs-react.js'
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
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ],
  },
};
