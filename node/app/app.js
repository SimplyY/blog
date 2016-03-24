require('./polyfill')

var express = require('express')

var config = require('../../config')
var controller = require('./controller')
var mid = require('./mid')

var app = express()

setHeader(app)
mid.useMid(app)

var models = require('./model/models')
controller.setApiRouters(app, models)
renewDbTimer(models)

controller.setViews(app)

app.get('*', handleRender)


app.listen(config.serverPort)
console.log('listening:', config.serverPort)

function setHeader(app) {
    app.all('*', function(req, res, next) {
        // for local dev
        // res.header("Access-Control-Allow-Origin", "http://localhost:8080")
        res.header('Access-Control-Allow-Origin', 'http://simplyy.space')
        res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
        res.header('Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
        if (req.method === 'OPTIONS') {
            res.sendStatus(200)
        }
        next()
    })
}

function renewDbTimer(models) {
    models.renewDatabase()
    setInterval(function () {
        models.renewDatabase()
    }, config.renewInterval * 1000)
}

require('babel-core/register')
var React = require('react')
var renderToString = require('react-dom/server').renderToString
var createMemoryHistory = require('history/lib/createMemoryHistory')
var reactRouter = require('react-router')
var match = reactRouter.match
var RouterContext = reactRouter.RouterContext
var Provider = require('react-redux').Provider

var configureStore = require('../../front-end/src/react/store/createConfigureStore.jsx').default

var loadMustDataAction = require('../../front-end/src/react/actions/articles.js').loadMustDataAction

var routes = require('../../front-end/src/routes.jsx').default

function handleRender(req, res) {
    var history = createMemoryHistory()
    var store = configureStore(undefined, history)
    console.log(req.url)
    match({ routes: routes, location: req.url }, function(error, redirectLocation, renderProps) {
        if (error) {
            res.status(500).send(error.message)
        }
        else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        }
        else if (renderProps) {
            var initialState
            var reactHtml
            models.loadMustData(req.url)
                .then(function(data) {
                    store.dispatch(loadMustDataAction(data))
                    initialState = store.getState()
                    var Router = React.createElement(RouterContext, renderProps)
                    var Root = React.createElement(Provider, {store: store}, Router)
                    reactHtml = renderToString(Root)
                    return data
                })
                .then(getTitle)
                .then(function(title) {
                    // 把渲染后的页面内容发送给客户端
                    res.send(renderFullPage(reactHtml, initialState, title))

                })
                .catch(function(error) {
                    if (error) {
                        console.log('loadMustData:', error)
                        throw error
                    }
                })

        }
        else {
            res.status(404).send('Not found')
        }
    })

    function getTitle(data) {
        if (data.articles.length === 1) {
            return new Promise(function(resolve, reject) {
                if (data.articles === undefined) {
                    reject()
                }
                else {
                    resolve(data.articles[0].title)
                }
            });
        }
        else {
            if (req.url === '/') {
                return new Promise(function(resolve) {
                    resolve('主页')
                })
            }
            var id = models.getIdStr(req.url)
            var pTag = models.getTagById(id)
            return pTag.then(function(tag) {
                return tag.tagName
            })
        }
    }
}

function renderFullPage(html, initialState, title) {
    return `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="utf-8">
            <title>SimplyY 的博客:${title}</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
            </script>
            <script src="http://7xkpdt.com1.z0.glb.clouddn.com/blog-libs.348172ab82b494835d50.0.js"></script>
            <script src="/static/bundle.js"></script>

            <!-- blog ads-->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-9240750359266096"
                 data-ad-slot="7067368564"
                 data-ad-format="auto">
             </ins>
        </body>
        </html>
    `
}
