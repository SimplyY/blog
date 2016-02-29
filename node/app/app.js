var express = require('express');

var config = require('../../config');
// var models = require('./models');
var controller = require('./controller');
var mid = require('./mid');
var models = require('./models');

var app = express();

setHeader(app);
mid.useMid(app);

controller.setRouters(app, models);
controller.setViews(app);

renewDbTimer(models);

app.listen(config.serverPort);
console.log('listening:', config.serverPort);

function setHeader(app) {
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        if (req.method == 'OPTIONS') res.sendStatus(200);
        next();
    });
}

function renewDbTimer(models) {
    models.renewDatabase();
    setInterval(function () {
        models.renewDatabase();
    }, config.renewInterval * 1000);
}
