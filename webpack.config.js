'use strict';

var path = require('path');
var webpack = require('webpack');
var HardSourcePlugin = require('hard-source-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    duckhunt: './main.js',
  },
  output: {
    path: 'dist',
    filename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory',
        options: { presets: ['es2015'] },
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(mp3|ogg)$/,
        loader: 'file-loader',
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.min.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    inline: true,
    port: 8080
  },
  plugins: [
    new HardSourcePlugin({
      cacheDirectory: '../node_modules/.cache/hardsource/[confighash]',
      recordsPath: '../node_modules/.cache/hardsource/[confighash]/records.json',
      configHash: function(webpackConfig) {
        return require('node-object-hash')().hash(webpackConfig);
      }
    })
  ],
};