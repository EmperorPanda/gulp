const htmlwebpackplugin = require('html-webpack-plugin')
const webpack = require('webpack')

const allModel = [
    'eval',
    // 'cheap-eval-source-map',
    // 'cheap-module-eval-source-map',
    'eval-source-map',
    // 'cheap-source-map',
    // 'cheap-module-source-map',
    'inline-cheap-source-map',
    'inline-cheap-module-source-map',
    // 'source-map',
    'inline-source-map',
    'hidden-source-map',
    // 'nosources-source-map'
]

module.exports = allModel.map(item => {
    return {
        devtool: item,
        mode: 'none',
        entry: './src/index.js',
        output: {
            filename: `js/${item}.js`,
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
                // {
                //     test: /src\/\*\*\.html$/i,
                //     use: [
                //         {
                //             loader: 'html-loader',
                //             options: {
                //                 attrs: ['img:src'], // '设置会被webpack打包的属性引用链接'
                //             }
                //         },
                //     ],
                // },
            ]
        },
        plugins: [
            new htmlwebpackplugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    }
})