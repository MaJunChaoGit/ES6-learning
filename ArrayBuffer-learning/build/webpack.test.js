const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  entry: {
    app: ['./src/index.js']
  },
  mode: 'development',
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: '[name].js',
    sourcePrefix: ''
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  devtool: '#inline-source-map',
  module: {
    rules: [
      {
        enforce: 'post',
        test: /\.jsx?$/,
        loader: 'istanbul-instrumenter-loader',
        options: { esModules: true },
        exclude: config.jsexclude,
        include: /src|packages/
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader?minimize=false'
      },
      {
        test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.svg(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './examples/index.html',
      inject: true
    })
  ]
};

module.exports = webpackConfig;
