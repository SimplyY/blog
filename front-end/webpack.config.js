var path = require('path')
var webpack = require('webpack')

var SRC_PATH = path.join(__dirname, 'src')

module.exports = {
    devtool: 'eval-source-map',
    entry: [
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
            include: path.join(SRC_PATH, 'scss')
        }, {
            test: /\.(js|jsx)$/,
            loaders: [ 'babel'],
            exclude: /node_modules/,
            include: SRC_PATH
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=20000'
        }]
    }
}
