var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '/dist'
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '/images/'
                    }
                }]
            }
        ]
    },
    devServer: {
          contentBase: path.resolve(__dirname, 'dist'),
          compress: true,
          port: 9000,
          stats: 'errors-only'
    },
    plugins: [
          new HtmlWebpackPlugin({
            title: 'Webpack 101',
            minify: {
                collapseWhitespace: false
            },
            hash: true,
            cache: true,
            showErrors: true,
            template: './src/index.ejs'
        }),
        new ExtractTextPlugin({
            filename: './app.css',
            disable: false,
            allChunks: true
        })
  ]
}
