var express = require('express');

var config = require('./config');
// var models = require('./models');
var controller = require('./controller');
var mid = require('./mid');
var models = require('./models');

var app = express();

mid.useMid(app);

controller.setRouters(app, models);
controller.setViews(app);

app.listen(config.port);
console.log('listen:', config.port);
