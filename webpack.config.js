var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./app/index.js', './app/scss/main.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/, exclude: /node_modules/, use: [ 'babel-loader', ]
            },{ // regular css files
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader?importLoaders=1',
                }),
            },{ // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: 'dist/[name].bundle.css',
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            template: 'app/index.html'
    })]
}