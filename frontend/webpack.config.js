'use strict';

const webpack = require('webpack');
const path = require('path');
const copy = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
    entry: {
        app: [APP_DIR + '/index.js']
    },

    output: {
        path: BUILD_DIR,
        filename: 'bundle/bundle.js'
    },

    context: path.join(__dirname, 'src'),

    module: {
        rules: [
            {
              test: /\.(js|jsx)?/,
              exclude: [/node_modules/],
              include: APP_DIR,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env'],
                  }
              }
            },
            {
                test: /\.html$/,
                loaders: ['raw-loader'],
            },
            {
                test:/\.css$/,
                loaders: ['style-loader', 'css-loader?-url', 'postcss-loader', 'sass-loader']
            },
            {
                test:/\.scss$/,
                loaders: ['style-loader', 'css-loader?-url', 'postcss-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        new copy([
            {from: APP_DIR + "/html/", to: BUILD_DIR},
        ], {
            copyUnmodified: false,
            debug: 'debug'
            }
        )
    ]
}

module.exports = config;