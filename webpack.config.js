const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MinifyCss = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          "css-loader", 
          "postcss-loader"
        ],
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        use: [
          "file-loader?name=./vendor/[name].[ext]",
          {
            loader: "image-webpack-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/i,
        use: [
          "file-loader?name=./fonts/[name].[ext]",
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new MinifyCss({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "src/index.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "src/aboutProject.html",
      filename: "aboutProject.html",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "src/analytics.html",
      filename: "analytics.html",
    }),
    new WebpackMd5Hash(),
  ],
};
