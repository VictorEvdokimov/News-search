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
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg|eot|ttf|woff?2)$/i,
        use: [
          "file-loader?name=./vendor/[name].[ext]",
          {
            loader: "image-webpack-loader",
            options: {},
          },
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
    new WebpackMd5Hash(),
  ],
};
