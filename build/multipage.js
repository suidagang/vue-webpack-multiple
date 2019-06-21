const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 通过页面配置文件过去页面json
function generateByConfig() {
  return JSON.parse(fs.readFileSync("./src/page.json"));
}

// 生成extraEntry
const extraEntry = generateByConfig();

let newExtraEntry = {};

// 生成HtmlWebpackPlugin
let extraHtmlWebpackPlugins = [];
for (let i in extraEntry) {
  let chunk = i;
  newExtraEntry[chunk] = extraEntry[i].path;
  extraHtmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      filename: chunk + ".html",
      template: "public/index.html",
      chunks: [chunk],
      title: extraEntry[i].title,
      favicon:'public/favicon.ico',
    })
  );
}
exports.extraEntry = newExtraEntry;
exports.extraHtmlWebpackPlugins = extraHtmlWebpackPlugins;
