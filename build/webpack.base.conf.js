const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
const webpack = require("webpack");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const multiBuilder = require("./multipage");
const { extraEntry, extraHtmlWebpackPlugins } = multiBuilder;
function resolve(dir) {
    return path.join(__dirname, "..", dir);
}
module.exports = {
    entry: {
        ...extraEntry
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[hash].js'
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
                include: [
                    resolve("src"),
                    resolve("node_modules/webpack-dev-server/client")
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(css|less)$/,
                use: [
                    devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ],
            },
        ]
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all', // 控制webpack选择哪些代码块用于分割（其他类型代码块按默认方式打包）。有3个可选的值：initial、async和all。
    //         minSize: 30000, // 形成一个新代码块最小的体积
    //         maxSize: 0,
    //         minChunks: 1, // 在分割之前，这个代码块最小应该被引用的次数（默认配置的策略是不需要多次引用也可以被分割）
    //         automaticNameDelimiter: '~',
    //         name: true,
    //         cacheGroups: {
    //           vendors: { // 将所有来自node_modules的模块分配到一个叫vendors的缓存组
    //             test: /[\\/]node_modules[\\/]/,
    //             priority: -10 // 缓存组的优先级(priotity)是负数，因此所有自定义缓存组都可以有比它更高优先级
    //           },
    //           default: { 
    //             minChunks: 2, // 所有重复引用至少两次的代码，会被分配到default的缓存组。
    //             priority: -20, // 一个模块可以被分配到多个缓存组，优化策略会将模块分配至跟高优先级别（priority）的缓存组
    //             reuseExistingChunk: true // 允许复用已经存在的代码块，而不是新建一个新的，需要在精确匹配到对应模块时候才会生效。
    //           }
    //         }
    //       },
    //     runtimeChunk: {
    //         name: entrypoint => `manifest.${entrypoint.name}`
    //     }
    // },
    plugins: [
        ...extraHtmlWebpackPlugins,
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? 'static/css/[name].css' : 'static/css/[name].[hash].css',
            chunkFilename: devMode ? 'static/css/[id].css' : 'static/css/[id].[hash].css'
        }),
        //告诉 Webpack 使用了哪些动态链接库
        new webpack.DllReferencePlugin({
            // 描述 lodash 动态链接库的文件内容
            manifest: require('../public/vendor/vendor.manifest.json')
        }),
        //该插件将把给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中。
        new AddAssetHtmlPlugin([
            {
                // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持globby字符串
                filepath: require.resolve(path.resolve(__dirname, '../public/vendor/vendor.dll.js')),
                // 文件输出目录
                outputPath: 'vendor',
                // 脚本或链接标记的公共路径
                publicPath: 'vendor'
            }
        ])

    ]
}