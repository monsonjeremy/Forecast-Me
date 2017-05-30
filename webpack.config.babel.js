// @flow

import path from 'path'
import webpack from 'webpack'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

import { WDS_PORT } from './src/shared/config'
import { isProd } from './src/shared/util'

const extractSass = new ExtractTextWebpackPlugin({
  filename: 'css/[name].bundle.css',
  disable: !isProd,
})

const config = {
  entry: [
    'react-hot-loader/patch',
    'bootstrap-loader?bootstrapPath=./node_modules/bootstrap-sass',
    './src/client',
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      images: path.resolve(__dirname, 'src/assets/images'),
      styles: path.resolve(__dirname, 'src/assets/stylsheets'),
    },
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
        test: /\.(jpe?g|png|gif)$/i,
        loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: isProd ? false : 'source-map',
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
    new CopyWebpackPlugin([
      { from: './src/assets/manifest.json' },
    ]),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
    }),
  ],
}

if (isProd) {
  config.plugins.push(
    new webpack.optimize.AggressiveMergingPlugin(),
  )
}

module.exports = config
