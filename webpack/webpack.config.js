'use strict';

const webpack = require('webpack'),
      NunjucksRenderPlugin = require('./plugins/renderer'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: './build',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
        ]
    },
    plugins: [
        // Copy assets (images, css, etc to build folder)
        new CopyWebpackPlugin([{
            from: './assets',
            to: './'
        }]),
        // Compile CSS into file
        new ExtractTextPlugin('./css/styles.css'),
        // Render HTML pages from yaml file context
        new NunjucksRenderPlugin({
            baseDir: './src/templates',
            files: [
                {
                    context: './src/pages/home.yml',
                    outFile: './build/index.html',
                    template: './home/index.njk.html'
                },
                {
                    context: './src/pages/faq.yml',
                    outFile: './build/faq.html',
                    template: './faq/index.njk.html'
                },
                {
                    context: './src/pages/endorsements.yml',
                    outFile: './build/endorsements.html',
                    template: './endorsements/index.njk.html'
                },
                {
                    context: './src/pages/resources.yml',
                    outFile: './build/resources.html',
                    template: './resources/index.njk.html'
                }
            ]
        }),
        // Optimize
        new webpack.optimize.UglifyJsPlugin()
    ],
    watchOptions: {
        poll: true
    }
};
