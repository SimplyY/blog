var array = require("array-extended");
var mongoose = require('mongoose');
var _ = require("lodash");

var config = require('../../config');
var moment = require('moment-timezone');
var tagArticle = require('./util/read-tag-article.js');


var localConfig = {
    tagModelName: 'tag',
    tagKeyAttrName: 'tagName',
    articleModelName: 'article',
    articleKeyAttrName: 'title',
};


var db = mongoose.connect(config.mongoUrl);

var tagSchema = new mongoose.Schema({
    tagName: { type: String, required: true },
    parentTagName: { type: String, required: true },

    // 几级目录，一级目录从 1 开始
    tagRank: Number,

    // 此标签的父标签数组，比如，对于路径 /yourPath/Article/编程/web 前端/es6简版入门
    // parentsTagNameArray： [ '编程', 'web 前端' ]
    parentsTagNameArray: [{ type: String, required: true }],

    // without sorted
    // 此标签下的所有文章，即标签所在文件路径里的所有 md 文件
    articleTitleList:[{ type: String, required: true }] // 属于此标签
});

db.model(localConfig.tagModelName, tagSchema);

var articleSchema = new mongoose.Schema({
    // md 文件，不包括'.md'后缀
    title: { type: String, required: true },
    parentTagName: { type: String, required: true },
    parentsTagNameArray: [{ type: String, required: true }], // 同上
    md:  { type: String, required: true },
    html: { type: String, required: true},
    contentOfTable: { type: String, required: true },
    // because date con't be json.stringfy safe, so use String type
    date: { type: String, default: moment().tz("Asia/Shanghai").format() },

    loveNumber: { type: Number, default: 0 },
    shareNumber: { type: Number, default: 0 },
    // diffcult,easy grade
    grade: { type: Number, default: 50 },

    comments:[{
        date: { type: String, default: moment().tz("Asia/Shanghai").format() },

        email: String,
        avatorUrl: String,
        nickName: String,
        content: String,
    }]
});

db.model(localConfig.articleModelName, articleSchema);

var marked = require('../lib/hackedMarked');
var hljs = require('highlight.js');

marked.setOptions({
    highlight: function(code) {
        return hljs.highlightAuto(code).value;
    }
});

function renewDatabase() {
    var newTagsNames = [], newArticlesTitles = [];
    var oldTagsNames = [], oldArticlesTitles = [];

    tagArticle.getTagAndArticle(function (newTags, newArticles) {
        var oldTags, oldArticles;

        newTags.forEach(function (item) {
            newTagsNames.push(item.tagName);
        });

        newArticles.forEach(function (item) {
            newArticlesTitles.push(item.title);
        });

        var tagModel = mongoose.model(localConfig.tagModelName);
        var articleModel = mongoose.model(localConfig.articleModelName);

        // get tags from db
        var pTag = tagModel.find({}).exec();
        pTag.then(function (docs) {
            oldTags = docs;
            for (var i = 0; i < oldTags.length; i++) {
                var item = oldTags[i];
                oldTagsNames.push(item.getValue(localConfig.tagKeyAttrName));
            }
        });
        // get articles from db
        var pArticle = articleModel.find({}).exec();
        pArticle.then(function (docs) {
            oldArticles = docs;
            for (var i = 0; i < oldArticles.length; i++) {
                var item = oldArticles[i];
                oldArticlesTitles.push(item.getValue(localConfig.articleKeyAttrName));
            }
        });

        var addItemsKeys, deleteItemsKeys, updateItemsKeys;
        Promise.all([pTag, pArticle])
            .then(function () {
                var tagOperateItemsKeys = getOperateItemsKeys(oldTagsNames, newTagsNames);
                var articleOperateItemsKeys = getOperateItemsKeys(oldArticlesTitles, newArticlesTitles);

                getAttrsForAritcleFromMd(articleOperateItemsKeys, oldArticles, newArticles);

                operateDatabase(localConfig.tagModelName, tagOperateItemsKeys, oldTags, newTags);
                operateDatabase(localConfig.articleModelName, articleOperateItemsKeys, oldArticles, newArticles);
            });
    });


}

// 韦恩图给的灵感，来求增删改的元素，=。=，不过只能对主键处理，因为不支持 objects.difference
function getOperateItemsKeys(oldItemsKeys, newItemsKeys) {
    var addItemsKeys = array.difference(newItemsKeys, oldItemsKeys);
    var deleteItemsKeys = array.difference(oldItemsKeys, newItemsKeys);

    var allItemsKeys = array.union(newItemsKeys, oldItemsKeys);
    var differenceItemsKeys = array.union(addItemsKeys, deleteItemsKeys);

    var updateItemsKeys = array.difference(allItemsKeys, differenceItemsKeys);

    return {
        addItemsKeys: addItemsKeys,
        deleteItemsKeys: deleteItemsKeys,
        updateItemsKeys: updateItemsKeys
    };
}

// get attrs(html, contentOfTable)
function getAttrsForAritcleFromMd(articleOperateItemsKeys, oldArticles, newArticles) {
    var addItemsKeys = articleOperateItemsKeys.addItemsKeys;
    var updateItemsKeys = articleOperateItemsKeys.updateItemsKeys;

    for (i = 0; i < addItemsKeys.length; i++) {
        var addObject = findObject(addItemsKeys[i], localConfig.articleModelName, newArticles);
        addObject.html = marked(addObject.md);
        addObject.contentOfTable = getContentOfTableFromHTML(addObject.html);
    }

    for (i = 0; i < updateItemsKeys.length; i++) {
        var updateObject = findObject(updateItemsKeys[i], localConfig.articleModelName, newArticles);
        var oldObject = findObject(updateItemsKeys[i], localConfig.articleModelName, oldArticles);

        if (updateObject.md !== oldObject.md) {
            updateObject.html = marked(updateObject.md);
            updateObject.contentOfTable = getContentOfTableFromHTML(updateObject.html);
        }

    }
}

var cheerio = require('cheerio');
var getPrefix = require('./util/common').getPrefix;
function getContentOfTableFromHTML(html) {
    var $ = cheerio.load(html);
    var titles = $('h1,h2,h3,h4,h5,h6').get();
    var contentOfTable = titles.map(function(item) {
        return {
            content: item.attribs.id,
            // tagName is 'Hx', rank is x
            rank: Number.parseInt(item.name[1], 10)
        };
    });
    getPrefix(contentOfTable);
    return JSON.stringify(contentOfTable);
}


// for modelName is tag or article
function findObject(itemKey, modelName, objects) {
    var keyAttrName;
    if (modelName === localConfig.tagModelName) {
        keyAttrName = localConfig.tagKeyAttrName;
    } else if (modelName === localConfig.articleModelName) {
        keyAttrName = localConfig.articleKeyAttrName;
    }

    for (var i = 0; i < objects.length; i++) {
        if (itemKey === objects[i][keyAttrName]) {
            return objects[i];
        }
    }
}

function operateDatabase(modelName, operateItemsKeys, oldMogoObjects, newObjects) {
    var model = mongoose.model(modelName);
    var oldObjects = [];
    for (var i = 0; i < oldMogoObjects.length; i++) {
        oldObjects.push(oldMogoObjects[i]._doc);
    }

    var addItemsKeys = operateItemsKeys.addItemsKeys;
    var deleteItemsKeys = operateItemsKeys.deleteItemsKeys;
    var updateItemsKeys = operateItemsKeys.updateItemsKeys;

    for (i = 0; i < addItemsKeys.length; i++) {
        var addObject = findObject(addItemsKeys[i], modelName, newObjects);
        model.create(addObject);
    }

    for (i = 0; i < updateItemsKeys.length; i++) {
        var updateObject = findObject(updateItemsKeys[i], modelName, newObjects);
        var oldObject = findObject(updateItemsKeys[i], modelName, oldObjects);

        if (IsEqualWithFileRead(oldObject, updateObject, modelName)) {
            continue;
        }

        var updateConditions = getConditions(updateObject, modelName);

        model.update(updateConditions, updateObject, handleError);
    }

    for (i = 0; i < deleteItemsKeys.length; i++) {
        var deleteObject = findObject(deleteItemsKeys[i], modelName, oldObjects);
        var deleteConditions = getConditions(deleteObject, modelName);
        model.remove(deleteConditions, handleError);
    }

    function getConditions(object, modelName) {
        var conditions = {};
        if (modelName === localConfig.tagModelName) {
            conditions[localConfig.tagKeyAttrName] = object[localConfig.tagKeyAttrName];
        } else if (modelName === localConfig.articleModelName) {
            conditions[localConfig.articleKeyAttrName] = object[localConfig.articleKeyAttrName];
        }
        return conditions;
    }

    function IsEqualWithFileRead(oldObject, newObject, modelName) {
        var isEqual;
        if (modelName === localConfig.tagModelName) {
            isEqual = oldObject.tagName === newObject.tagName &&
                oldObject.parentTagName === newObject.parentTagName &&
                oldObject.tagRank === newObject.tagRank &&
                _.isEqual(oldObject.parentsTagNameArray, newObject.parentsTagNameArray) &&
                _.isEqual(oldObject.articleTitleList, newObject.articleTitleList);
        }
        else if (modelName === localConfig.articleModelName) {
            isEqual = oldObject.title === newObject.title &&
                oldObject.parentTagName === newObject.parentTagName &&
                oldObject.md === newObject.md &&
                _.isEqual(oldObject.parentsTagNameArray, newObject.parentsTagNameArray);
        }
        return isEqual;
    }
}

function handleError(err, raw) {
    if (err) console.log(err);
}

module.exports = {
    tagSchema,
    articleSchema,
    renewDatabase
};
