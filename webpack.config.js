const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const devtool = isDevelopment ? 'source-map' : '';

module.exports = [{
  entry: './src/scripts/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist', 'scripts'),
  },
}, {
  entry: './src/styles/main.scss',
  output: {
    path: path.resolve(__dirname, 'dist', 'styles'),
  },
  devServer: {
    contentBase: './dist',
    watchContentBase: true,
    hot: true,
    // open: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new IgnoreEmitPlugin(['main.js']),
  ]
}];
