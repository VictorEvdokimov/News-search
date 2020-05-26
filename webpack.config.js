const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MinifyCss = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: { 
    index: './src/index.js',
    about: './src/aboutProject.js',
    analytics: './src/analytics.js' 
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [ 
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          }, 
          "css-loader", 
          "postcss-loader"
        ],
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/i,
        use: [
          'file-loader?name=vendor/fonts/[name].[ext]',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new MinifyCss({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/aboutProject.html',
      filename: 'aboutProject.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/analytics.html',
      filename: 'analytics.html',
    }),
    new WebpackMd5Hash(),
  ],
};
