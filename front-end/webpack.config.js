var path = require('path')
var webpack = require('webpack')

var SRC_PATH = path.join(__dirname, 'src')
var FONT_PATH = path.join(__dirname, 'font')

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client',
        './src/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    devServer: {
        noInfo: true,
        port: 3000,

     },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', ]
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loaders: [ 'style', 'css', 'sass'],
            include: path.join(SRC_PATH, 'css')
        }, {
            test: /\.css$/,
            loaders: [ 'style', 'css'],
            include: path.join(SRC_PATH, 'css')
        },{
            test: /\.(js|jsx)$/,
            loaders: [ 'babel'],
            exclude: /node_modules/,
            include: SRC_PATH
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=20000',
            exclude: /node_modules/,
        },
        {
            test: /\.(ttf|svg|woff|png|eot)/,
            loader : 'url?limit=20000',
            exclude: /node_modules/,
            include: FONT_PATH
        }
    ]
    }
}
