'use strict';

/**
 * PROD WEBPACK CONFIG
 */

// Global import
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { LoaderOptionsPlugin } = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

// Local import
const {
  CDN_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_PIXEL_ID,
  GA_TRACKING_ID,
  NAVER_APP_ID
} = require('../utils/env');
const { indexHtml, polyfills, publicDir, srcDir } = require('../utils/path');

module.exports = {
  mode: 'production',
  entry: {
    bundle: srcDir,
    polyfills
  },
  output: {
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  performance: {
    hints: 'warning'
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            comparisons: false,
            drop_console: true,
            drop_debugger: true,
            unused: true,
            warnings: false
          },
          mangle: true,
          output: {
            comments: false
          }
        },
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\/]node_modules[\\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single',
    noEmitOnErrors: true
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      filename: '[path].gz[query]',
      minRatio: 0.8,
      test: /\.(js|html)$/,
      threshold: 10240
    }),
    new CopyWebpackPlugin([{ from: publicDir, to: '.' }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: indexHtml,
      templateParameters: {
        CDN_URL,
        FACEBOOK_APP_ID,
        FACEBOOK_PIXEL_ID,
        GA_TRACKING_ID,
        NAVER_APP_ID
      },
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      chunksSortMode: 'none'
    }),
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    // new PrepackWebpackPlugin(),
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};
