require('./polyfill')

var fs = require('fs')
var path = require('path')
var os = require('os')
var express = require('express')

var config = require('../../config')
var controller = require('./controller')
var mid = require('./mid')

var app = express()
GLOBAL.blog = {}

setHeader(app)
mid.useMid(app)

var models = require('./model/models')
controller.setApiRouters(app, models)

if (os.platform() !== 'darwin') {
    renewDbTimer(models)
}

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

var htmlTemplate = fs.readFileSync(path.join(__dirname, 'views/index.html'), 'utf-8')
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
                    var RouterWrapper = React.createElement('div', {}, Router)
                    var Root = React.createElement(Provider, {store: store}, RouterWrapper)
                    reactHtml = renderToString(Root)
                    return GLOBAL.blog.title
                })
                .then(function(title) {
                    // 把渲染后的页面内容发送给客户端
                    res.send(renderFullPage(title, reactHtml, initialState))

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
}

function renderFullPage(title, reactHtml, initialState) {
    var html = htmlTemplate.replace('${title}', title)
        .replace('${reactHtml}', reactHtml)
        .replace('${initialState}', JSON.stringify(initialState))
    return html
}
