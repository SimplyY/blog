var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        app: './src/index.jsx',
        //添加要打包在 libs 里面的库
        libs: ['react']
    },
    output: {
        path: '../node/app/static',
        filename: 'bundle.js'
    },
    plugins: [
        //这个使用uglifyJs压缩你的js代码
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin('libs', 'libs.js'),
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
            include: __dirname,
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=20000'
        }]
    }
}
