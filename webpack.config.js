const Path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: ['babel-polyfill', Path.join(__dirname, 'src', 'bitly.js')],
    target: 'node',
    output: {
        path: Path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    externals: [nodeExternals()],
    resolve: {
        modules: [Path.resolve(__dirname, '/src'), Path.resolve(__dirname, 'node_modules/')],
        descriptionFiles: ['package.json']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, '*.spec.js'],
                loader: 'babel-loader', // or just "babel"
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
