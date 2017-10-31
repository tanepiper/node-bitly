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
    entry: ['babel-polyfill', Path.join(__dirname, 'src', 'bitly.js')],
    target: 'node',
    output: {
        path: Path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    externals: nodeModules,
    resolve: {
        modules: [Path.resolve(__dirname, '/src'), 'node_modules/'],
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
