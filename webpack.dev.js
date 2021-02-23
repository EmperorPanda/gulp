const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const common = require('./webpack.config')
console.log(common, 8999)

module.exports = merge(common(), {
    optimization: {
        usedExports: true, // 只导出外部使用的成员
    },
    plugins: [
        new CleanWebpackPlugin(),
        new copyWebpackPlugin({
            patterns: [{
                 from: path.resolve(__dirname, 'public'),
            }]
        }),
        new webpack.DefinePlugin({
            orgin_url: '"https://www.baidu.com"'
        })
    ]
})
