var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        './index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    devServer: {
        noInfo: true,
        port: 3000
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
            include: path.join(__dirname, 'scss')
        }, {
            test: /\.(js|jsx)$/,
            loaders: [ 'babel'],
            exclude: /node_modules/,
            include: __dirname
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=20000'
        }]
    }
}
