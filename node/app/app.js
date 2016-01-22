var express = require('express');

var config = require('../../config');
// var models = require('./models');
var controller = require('./controller');
var mid = require('./mid');
var models = require('./models');

var app = express();

mid.useMid(app);

controller.setRouters(app, models);
controller.setViews(app);

setInterval(function () {
    models.renewDatabase();
}, config.renewInterval * 1000);

app.listen(config.serverPort);
console.log('listening:', config.serverPort);
