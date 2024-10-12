const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BannerWebpackPlugin = require('./plugins/BannerWebpackPlugin')
const AnalyzeWebpackPlugin = require('./plugins/AnalyzeWebpackPlugin')
const CleanWebpackPlugin = require('./plugins/cleanWebpackPlugin')
const DefineWebpackPlugin = require('./plugins/defineWebpackPlugin')
const path = require('path')

module.exports = {
    mode: 'development',
    // entry: ['./src/index.js', './src/main.js'],
    entry: {
        index: ['./src/index.js', './src/test.js'],
        other: './src/main.js'
    },
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                // use: ['style-loader', 'css-loader']
                use: ['styleLoader', 'css-loader', 'less-loader']
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babelLoader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    {
                        loader: 'bannerLoader',
                        options: {
                            name: 'josie',
                            age: 28
                        }
                    }, 
                    // 'cleanLogLoader', 
                ]
            }
        ]
    },
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './template.html'
        }),
        new BannerWebpackPlugin({
            name: 'wzj',
            age: 'sjhkja'
        }),
        new AnalyzeWebpackPlugin(),
        // new CleanWebpackPlugin(),
        new DefineWebpackPlugin({
            'env': {
                dev: 1,
                main: 2,
            },
            'name': 'wzj'
        })
    ],
    devServer: {
        port: 3009,
    },
    devtool: 'source-map'
}