// @flow

import path from 'path'
import webpack from 'webpack'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'

import { WDS_PORT } from './src/shared/config'
import { isProd } from './src/shared/util'

const extractSass = new ExtractTextWebpackPlugin({
  filename: 'css/[name].bundle.css',
  disable: !isProd,
})

export default {
  entry: [
    'react-hot-loader/patch',
    './src/client',
    './public/scss/main.scss',
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loader: extractSass.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', 'sass-loader',
          ],
        }),
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        include: path.resolve(__dirname, 'public/assets/'),
      },
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT,
    hot: true,
  },
  plugins: [
    extractSass,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
