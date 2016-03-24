var path = require('path')

var express = require('express')
var favicon = require('serve-favicon')
var compress = require('compression')
var bodyParser = require('body-parser')

module.exports.useMid = function (app) {
    app.use(compress())
        .use(favicon(path.join(__dirname, 'static', 'favicon.ico.jpeg')))
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: false }))
        .use('/static', express.static(path.join(__dirname, 'static'),{
            etag: false,
    }))
}
