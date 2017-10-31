const Path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var nodeModules = {};
fs
    .readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: Path.join(__dirname, 'src', 'bitly.js'),
    target: 'node',
    output: {
        path: Path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    externals: nodeModules,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader', // or just "babel"
                query: {
                    presets: ['es2017', 'es2015']
                }
            }
        ]
    }
};
