var path = require('path');

var uid = require('rand-token').uid;
var restful = require('node-restful');

var config = require('./config');
var token;

module.exports.setRouters = function (app, models) {
    app.get('/getApiToken', function(req, res) {
        var tokenLen = 32;
        if (token === undefined) {
            token = uid(tokenLen);
        }
        res.send(token);

        var expireTime = config.tokenExpireTime * 60 * 60 * 1000;
        setTimeout(function () {
            token = uid(tokenLen);
        }, expireTime);
    });

    var tagRest = restful.model(
            'tag',
            models.tagSchema
        ).methods(['get']);

    tagRest.register(app, '/tag');

    var articleRest = restful.model(
            'article',
            models.articleSchema
        ).methods(['get', 'put', 'post', 'delete']);

    articleRest.register(app, '/article');

};

module.exports.setViews = function (app) {
    // set view for .html
    app.engine('.html', require('ejs').__express);
    // 设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, 'views'));

    app.get('/', function (req, res) {
        res.render('view', function (err, html) {
            res.send(html);
        });
    });
};
