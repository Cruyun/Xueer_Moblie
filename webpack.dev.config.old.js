const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const csso = require('postcss-csso');
var projectRoot = path.resolve(__dirname, '../');
module.exports = {
    entry: {
        'bundle.js': ['whatwg-fetch', './src/main.js', 'webpack-hot-middleware/client']
    },
    output: {
        path: '/',
        publicPath: 'http://localhost:3000/static',
        filename: '[name]'
    },
    devServer: {
        quiet: true,
        noInfo: true
    },
    module: {
        // preLoaders: [{
        //     test: /\.vue$/,
        //     loader: 'eslint-loader',
        //     include: projectRoot,
        //     exclude: /node_modules/
        // }, {
        //     test: /\.js$/,
        //     loader: 'eslint-loader',
        //     include: projectRoot,
        //     exclude: /node_modules/
        // }],
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loader: "style-loader!css-loader!postcss-loader!sass-loader"
        }, {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file?limit=8192',
            query: {
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    vue: {
        postcss: function() {
            let arr = [
                // px2vw({
                //     remUnit: 36
                // }),
                csso({
                    restructure: false
                })
            ];
            return arr;
        },
        cssModules: {
            localIdentName: '[path][name]-[local]-[hash:base64:5]',
            camelCase: true
        }
    },
    devtool: '#eval-source-map',
    resolve: {
        extensions: ['', '.js', '.scss', '.vue']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};