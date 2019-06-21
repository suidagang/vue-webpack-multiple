const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const packageConfig = require("../package.json");
const webpack = require("webpack")
const port = '5555'
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://localhost:${port}`]
      },
      onErrors: function (severity, errors) {
        if (severity !== "error") return;
        const error = errors[0];
        const filename = error.file && error.file.split("!").pop();
        notifier.notify({
          title: packageConfig.name,
          message: severity + ": " + error.name,
          subtitle: filename || "",
          icon: path.join(__dirname, "logo.png")
        });
      },
    })

  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    hot: true,
    overlay: false,
    quiet: true, // necessary for FriendlyErrorsPlugin
    clientLogLevel: "silent",
    port: port,
    host: 'localhost',//主机地址
    compress: true//开发服务器是否启动gzip等压缩

  }
});