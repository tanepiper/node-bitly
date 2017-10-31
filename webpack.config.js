const Path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: ['babel-polyfill', Path.join(__dirname, 'src', 'bitly.js')],
    target: 'node',
    devtool: 'sourcemap',
    output: {
        path: Path.join(__dirname, 'dist'),
        filename: 'bitly.js',
        libraryTarget: 'commonjs2',
        library: 'bitly'
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [Path.resolve(__dirname, '/src'), Path.resolve(__dirname, 'node_modules/')],
        descriptionFiles: ['package.json']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, '*.spec.js'],
                loader: 'ts-loader', // or just "babel"
            }
        ]
    }
};
