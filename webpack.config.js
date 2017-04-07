let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let path = require('path');


module.exports = {
    entry: {
        newEntry: './src/client/addEntry/addEntry',
        app: './src/client/app'
    },

    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: './js/[name].js',
        chunkFilename: '[id].js'
    },

    module: {
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass')
        }, {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
        }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./css/[name].css'),
        new CleanWebpackPlugin(['assets'], {
            root: '',
            verbose: true,
            dry: false,
            exclude: ['images']
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3002,
            proxy: 'localhost:3000'
        })
    ],
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js'
        }
    }
};
