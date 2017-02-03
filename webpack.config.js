'use strict';

// var HtmlWepbackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

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
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
    // new HtmlWepbackPlugin({
    //   filename: 'index.html',
    //   template: './src/index.html',
    //   inject: 'body',
    //   chunks: ['main'],
    // }),
    // new HtmlWepbackPlugin({
    //   filename: 'animated-preview.html',
    //   template: './tools/animated-preview/index.html',
    //   inject: 'body',
    //   chunks: ['animated-preview'],
    // }),
  ],
};