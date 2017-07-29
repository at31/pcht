'use strict';


const webpack = require('webpack');
const path = require('path');

var NODE_ENV = process.env.NODE_ENV || 'dev'; // 'prod' production для установки запускать из cnd (не PowerShell !!!) set NODE_ENV=dev & webpack
//const BowerWebpackPlugin = require("bower-webpack-plugin");
var AsyncModulePlugin = require('async-module-loader/plugin');

module.exports = {
    entry: {
        app: "./public/js/dev/app.js",
        pathapp:"./public/js/dev/pm/app.js",
        login:"./public/js/dev/pm/login.js",
        phase2app:"./public/js/dev/pm/phase2app.js",
        vendor: ['moment','jquery', 'bootstrap', 'fullcalendar','flatpickr','cytoscape'/*,'pdfmake'*/]
    },
    output: {
        path: path.join(__dirname, '/public/js'), 
        filename: "[name].js",
        publicPath: '/public/js',
    },

    watch: NODE_ENV == 'dev',
    devtool: function() {
        return NODE_ENV == 'dev' ? "cheap-inline-module-source-map" : null
    }(),
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin(
            {
            name: "vendor",
            filename: "vendors.js"
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(NODE_ENV)
        }), 
        new webpack.ProvidePlugin({
            moment:'moment',
            jQuery: 'jquery',
            $: 'jquery',
            "window.jQuery": "jquery",
            "window.$": "jquery",
            io:"socket.io-client",
            /*cytoscape:"cytoscape",
            "window.cytoscape":"cytoscape",*/
            "window.io": "socket.io-client",
            "window.Tether": 'tether'// нужен для bootstrap 4 
        }),      
        new AsyncModulePlugin(),
    ],
    module: {
        loaders: [
       /* {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel?presets[]=es2015'        
        },*/
        {
            test: /\.css$/,
            loader: "style!css"
        },
        {
            test: /\.jade$/,
            loader: "jade"
        },
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
}
};

if (NODE_ENV == 'prod') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // don't show unreachable variables etc
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}