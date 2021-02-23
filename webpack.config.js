/*
 * @Author: your name
 * @Date: 2020-12-10 13:45:36
 * @LastEditTime: 2020-12-24 15:47:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myGulpc:\Users\wing\Desktop\gulps\webpack.config.js
 */
const webpack = require('webpack')


const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'none', // webpack提供3种模式。
    entry: './src/index.js',
    // entry: './src/css/index.css',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'output'),
        // publicPath: 'dist/'
    },
    optimization: {
        usedExports: true,
        // minimize: true,
        // concatenateModules: true
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        contentBase: './public',
        proxy: {
            '/api': {
                // 相当于我们请求http://localhost:8080/api/user --> https://api.github.com/aps/user
                target: 'https://api.github.com',
                // 相当于我们请求http://localhost:8080/api/user --> https://api.github.com/user
                pathRewrite: {
                    '^/aps': ''
                },
                changeOrigin: true, // 修改主机名
            }
        }
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /.css$/,
                use: [
                    'style-loader', // 为css生成style标签
                    'css-loader'
                ], // 执行时从后往前执行的，style
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        // url-loader 可以用来打包小图标，字体图标之类的将其打包为base64 的图片，直接打包在js文件中,减少HTTP请求
                        // loader: 'file-loader',
                        loader: 'url-loader', // 默认超出的调用file-loader
                        options: {
                            limit: 10*1024 // 限制大小，10kb
                        }
                    },
                ],
            },
            {
                test: /src\/\*\*\.html$/i,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src'], // '设置会被webpack打包的属性引用链接'
                        }
                    },
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 创建实例
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: path.join(__dirname, 'index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
        // new HtmlWebpackPlugin({
        //     filename: 'about.html'
        // }),
        // new copyWebpackPlugin(['public'])
    ]
 
} 
