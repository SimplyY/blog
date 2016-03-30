var array = require('array-extended')
var _ = require('lodash')
var mongoose = require('mongoose')

var mongoUrl = require('../../../config').mongoUrl

// for md
var marked = require('../../lib/hackedMarked')
var hljs = require('highlight.js')
var cheerio = require('cheerio')

var tagArticle = require('../util/read-tag-article.js')
var getPrefix = require('../util/common').getPrefix

marked.setOptions({
    highlight: function(code) {
        return hljs.highlightAuto(code).value
    }
})

var config = {
    TAG_MODEL_NAME: 'tag',
    TAG_KEY_ATTR_NAME: 'tagName',
    ARTICLE_MODEL_NAME: 'article',
    ARTICLE_KEY_ATTR_NAME: 'title',

    PATH_TYPE_INDEX: 1,
}

var db = mongoose.connect(mongoUrl)

var schemas = require('./schemas')

var tagSchema = schemas.tagSchema
db.model(config.TAG_MODEL_NAME, tagSchema)

var articleSchema = schemas.articleSchema
db.model(config.ARTICLE_MODEL_NAME, articleSchema)

var tagModel = mongoose.model(config.TAG_MODEL_NAME)
var articleModel = mongoose.model(config.ARTICLE_MODEL_NAME)

function renewDatabase() {
    tagArticle.getTagAndArticle(function (newTags, newArticles) {
        var oldTagsNames = [], oldArticlesTitles = []
        var oldTags, oldArticles

        var newTagsNames = newTags.map(function (item) {
            return item.tagName
        })

        var newArticlesTitles = newArticles.map(function (item) {
            return item.title
        })

        // get tags from db
        var pTag = tagModel.find({}).exec()
        pTag.then(function (docs) {
            oldTags = docs
            oldTagsNames = oldTags.map(function(item) {
                return item.getValue(config.TAG_KEY_ATTR_NAME)
            })
        })
        // get articles from db
        var pArticle = articleModel.find({}).exec()
        pArticle.then(function (docs) {
            oldArticles = docs
            oldArticlesTitles = oldArticles.map(function(item) {
                return item.getValue(config.ARTICLE_KEY_ATTR_NAME)
            })
        })

        Promise.all([pTag, pArticle])
            .then(function () {
                var tagOperateItemsKeys = getOperateItemsKeys(oldTagsNames, newTagsNames)
                var articleOperateItemsKeys = getOperateItemsKeys(oldArticlesTitles, newArticlesTitles)

                getAttrsForAritcleFromMd(articleOperateItemsKeys, oldArticles, newArticles)

                operateDatabase(config.TAG_MODEL_NAME, tagOperateItemsKeys, oldTags, newTags)
                operateDatabase(config.ARTICLE_MODEL_NAME, articleOperateItemsKeys, oldArticles, newArticles)
            })
    })

    // 韦恩图给的灵感，来求增删改的元素，=。=，不过只能对主键处理，因为不支持 objects.difference
    function getOperateItemsKeys(oldItemsKeys, newItemsKeys) {
        var addItemsKeys = array.difference(newItemsKeys, oldItemsKeys)
        var deleteItemsKeys = array.difference(oldItemsKeys, newItemsKeys)

        var allItemsKeys = array.union(newItemsKeys, oldItemsKeys)
        var differenceItemsKeys = array.union(addItemsKeys, deleteItemsKeys)

        var updateItemsKeys = array.difference(allItemsKeys, differenceItemsKeys)

        return {
            addItemsKeys: addItemsKeys,
            deleteItemsKeys: deleteItemsKeys,
            updateItemsKeys: updateItemsKeys
        }
    }

    // get attrs(html, contentOfTable)
    function getAttrsForAritcleFromMd(articleOperateItemsKeys, oldArticles, newArticles) {
        var addItemsKeys = articleOperateItemsKeys.addItemsKeys
        var updateItemsKeys = articleOperateItemsKeys.updateItemsKeys

        for (var i = 0; i < addItemsKeys.length; i++) {
            var addObject = findObject(addItemsKeys[i], config.ARTICLE_MODEL_NAME, newArticles)
            addObject.html = marked(addObject.md)
            addObject.contentOfTable = getContentOfTableFromHTML(addObject.html)
        }

        for (i = 0; i < updateItemsKeys.length; i++) {
            var updateObject = findObject(updateItemsKeys[i], config.ARTICLE_MODEL_NAME, newArticles)
            var oldObject = findObject(updateItemsKeys[i], config.ARTICLE_MODEL_NAME, oldArticles)

            if (updateObject.md !== oldObject.md) {
                updateObject.html = marked(updateObject.md)
                updateObject.contentOfTable = getContentOfTableFromHTML(updateObject.html)
            }
        }
    }

    function getContentOfTableFromHTML(html) {
        var $ = cheerio.load(html)
        var titles = $('h1,h2,h3,h4,h5,h6').get()
        var contentOfTable = titles.map(function(item) {
            return {
                content: item.attribs.id,
                // tagName is 'Hx', rank is x
                rank: Number.parseInt(item.name[1], 10)
            }
        })
        getPrefix(contentOfTable)
        return JSON.stringify(contentOfTable)
    }

    // for modelName is tag or article
    function findObject(itemKey, modelName, objects) {
        var keyAttrName
        if (modelName === config.TAG_MODEL_NAME) {
            keyAttrName = config.TAG_KEY_ATTR_NAME
        }
        else if (modelName === config.ARTICLE_MODEL_NAME) {
            keyAttrName = config.ARTICLE_KEY_ATTR_NAME
        }

        for (var i = 0; i < objects.length; i++) {
            if (itemKey === objects[i][keyAttrName]) {
                return objects[i]
            }
        }
    }

    function operateDatabase(modelName, operateItemsKeys, oldMongoObjects, newObjects) {
        var model = mongoose.model(modelName)
        var oldObjects = []
        for (var i = 0; i < oldMongoObjects.length; i++) {
            oldObjects.push(oldMongoObjects[i]._doc)
        }

        var addItemsKeys = operateItemsKeys.addItemsKeys
        var deleteItemsKeys = operateItemsKeys.deleteItemsKeys
        var updateItemsKeys = operateItemsKeys.updateItemsKeys
        for (i = 0; i < addItemsKeys.length; i++) {
            var addObject = findObject(addItemsKeys[i], modelName, newObjects)
            model.create(addObject)
        }

        for (i = 0; i < updateItemsKeys.length; i++) {
            var updateObject = findObject(updateItemsKeys[i], modelName, newObjects)
            var oldObject = findObject(updateItemsKeys[i], modelName, oldObjects)

            if (isEqualWithFileRead(oldObject, updateObject, modelName)) {
                continue
            }

            var updateConditions = getConditions(updateObject, modelName)

            model.update(updateConditions, updateObject, handleError)
        }

        for (i = 0; i < deleteItemsKeys.length; i++) {
            var deleteObject = findObject(deleteItemsKeys[i], modelName, oldObjects)
            var deleteConditions = getConditions(deleteObject, modelName)
            model.remove(deleteConditions, handleError)
        }

        function getConditions(object, modelName) {
            var conditions = {}
            if (modelName === config.TAG_MODEL_NAME) {
                conditions[config.TAG_KEY_ATTR_NAME] = object[config.TAG_KEY_ATTR_NAME]
            }
            else if (modelName === config.ARTICLE_MODEL_NAME) {
                conditions[config.ARTICLE_KEY_ATTR_NAME] = object[config.ARTICLE_KEY_ATTR_NAME]
            }
            return conditions
        }

        function isEqualWithFileRead(oldObject, newObject, modelName) {
            var isEqual
            if (modelName === config.TAG_MODEL_NAME) {
                isEqual = oldObject.tagName === newObject.tagName &&
                    oldObject.parentTagName === newObject.parentTagName &&
                    oldObject.tagRank === newObject.tagRank &&
                    _.isEqual(oldObject.parentsTagNameArray, newObject.parentsTagNameArray) &&
                    _.isEqual(oldObject.articleTitleList, newObject.articleTitleList)
            }
            else if (modelName === config.ARTICLE_MODEL_NAME) {
                isEqual = oldObject.title === newObject.title &&
                    oldObject.parentTagName === newObject.parentTagName &&
                    oldObject.md === newObject.md &&
                    _.isEqual(oldObject.parentsTagNameArray, newObject.parentsTagNameArray)
            }
            return isEqual
        }
    }
}

require('babel-core/register')
var processTags = require('../../../front-end/src/util/AppData.js').processTags
var processArticles = require('../../../front-end/src/util/AppData.js').processArticles
var fe_config = require('../../../front-end/src/consts/config.js')

// MustData 也就是首屏需要的 Data
function loadMustData(url) {
    return new Promise(function(resolve, reject) {
        var pTags = getAllTags()

        // 通过 url 判断，如果为文章页面，只加载一篇文章（article）
        // 如果为 tag 页面或者根页面，只加载 limited articles
        var pArticles = getMustArticlesJudgeFromUrl(url)

        // 非 tag、article页面，只显示需要 tag 的 navgation-bar
        if (pArticles === undefined) {
            pTags.then(function(tags) {
                tags = JSON.parse(JSON.stringify(tags))
                var articles = []
                processTags(tags)
                var mustData = { tags, articles }
                resolve(mustData)
            })
        }

        Promise.all([pTags, pArticles])
            .then(function(datas) {
                var tags = JSON.parse(JSON.stringify(datas[0]))
                var articles = JSON.parse(JSON.stringify(datas[1]))
                var mustData = { tags, articles }
                // process data
                processTags(mustData.tags)
                processArticles(mustData.articles)
                // console.log(mustData)

                resolve(mustData)
            })
            .catch(function(error) {
                reject(error)
            })
    })

    // 文章页面只加载一篇文章（article）
    // tag 页面或者根页面加载 ArticlesInfos
    function getMustArticlesJudgeFromUrl(url) {
        var pArticles

        // pathTypeStr is tag or '' or article or other
        var pathTypeStr = getPathTypeStr(url)
        if (pathTypeStr === fe_config.ARTICLE_STR) {
            var articleId = getIdStr(url)
            pArticles = getArticleById(articleId)
            // pArticles will be undefined
        }
        else if ([fe_config.TAG_STR, fe_config.HOT_STR, ''].includes(pathTypeStr)) {
            pArticles = getArticlesInfos()
            // pArticle will be undefined
        }
        else {
            // other situation will all undefined
        }

        return pArticles
    }
}


function getPathTypeStr(url) {
    var params = url.split('/')
    return params[config.PATH_TYPE_INDEX]
}
function getIdStr(url) {
    var params = url.split('/')
    return params[config.PATH_TYPE_INDEX + 1]
}
function getTagById(id) {
    return tagModel.find({_id: id}).exec().then(
        function(docs) {
            return docs[0]
    })
}

function getAllTags() {
    return tagModel.find({}).exec()
}

function getArticleById(articleId) {
    return articleModel.find({_id: articleId}).exec()
}

function getArticlesInfos() {
    return articleModel.find({}).select(fe_config.MUST_DATA_SELECT_STR).sort('-date').exec()
}

function handleError(err, raw) {
    if (err) {
        console.log(err, raw)
    }
}

module.exports = {
    renewDatabase,
    loadMustData,
    getIdStr,
    getTagById
}
