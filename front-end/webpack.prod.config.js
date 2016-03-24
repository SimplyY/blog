var path = require('path')
var webpack = require('webpack')
var WebpackMd5Hash = require('webpack-md5-hash');

var SRC_PATH = path.join(__dirname, 'src')
var FONT_PATH = path.join(__dirname, 'font')

module.exports = {
    entry: {
        app: './src/index.jsx',
        // 添加要打包在 libs 里面的库
        libs: [
            'react', 'react-router',
            'immutable', 'redux', 'react-redux', 'redux-immutablejs','react-router-redux',
             'isomorphic-fetch', './lib/lodash.core.js','dompurify'
        ]
    },
    output: {
        path: '../node/app/static',
        filename: 'bundle.js'
    },
    plugins: [
        // 这个使用uglifyJs压缩你的js代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 把入口文件里面的数组打包成 libs.js
        new webpack.optimize.CommonsChunkPlugin('libs', 'libs.js'),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
        // new webpack.optimize.CommonsChunkPlugin('libs', 'libs.[chunkhash].[id].js'),
        // new WebpackMd5Hash()
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
            loader: 'url?limit=10000',
            exclude: /node_modules/,
            include: SRC_PATH
        },
        {
            test: /\.(ttf|svg|woff|png|eot)/,
            loader : 'url?limit=10000',
            exclude: /node_modules/,
            include: FONT_PATH
        }
    ]
    }
}
