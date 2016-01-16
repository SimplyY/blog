var path = require('path');

var express = require('express');
var favicon = require('serve-favicon');
var compress = require('compression');
var bodyParser = require('body-parser');
var crawlme = require('crawlme');

module.exports.useMid = function (app) {
    app.use(crawlme())
        .use(compress())
        // .use(favicon(path.join(__dirname, 'public', 'favicon.ico.png')))
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: false }))
        .use(express.static(path.join(__dirname, 'public'),{
            etag: false,
    }));
};
