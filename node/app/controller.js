var path = require('path');

var uid = require('rand-token').uid;
var restful = require('node-restful');

var config = require('../../config');
var token;

module.exports.setApiRouters = function (app, models) {
    // restful routers
    var tagRest = restful.model(
            'tag',
            models.tagSchema
        ).methods(['get']);

    tagRest.register(app, '/api/tags');

    var articleRest = restful.model(
            'article',
            models.articleSchema
        ).methods(['get', 'put', 'post']);

    articleRest.register(app, '/api/articles');

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
};

module.exports.setViews = function (app) {
    // set view for .html
    app.engine('.html', require('ejs').__express);
    // 设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, 'views'));

    app.get('/google0fb416815f1d4d7c.html', function (req, res) {
        res.render('google0fb416815f1d4d7c', function (err, html) {
            res.send(html);
        });
    });

    // app.get('/*', function (req, res) {
    //     res.render('blog', function (err, html) {
    //         res.send(html);
    //     });
    // });
};
