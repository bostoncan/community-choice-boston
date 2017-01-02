'use strict';

const NunjucksRenderPlugin = require('./plugins/renderer'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: './build',
        filename: "app.js"
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: './assets',
            to: './assets'
        }]),
        new NunjucksRenderPlugin({
            baseDir: './src/templates',
            files: [{
                context: './src/pages/home.yml',
                outFile: './build/index.html',
                template: './home/index.njk.html'
            }]
        })
    ],
    watch: true,
    watchOptions: {
        poll: true
    }
};
