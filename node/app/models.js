var array = require("array-extended");

var mongoose = require('mongoose');
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
    aritcleTitleList:[{ type: String, required: true }] // 属于此标签
});

db.model(localConfig.tagModelName, tagSchema);

var articleSchema = new mongoose.Schema({
    // md 文件，不包括'.md'后缀
    title: { type: String, required: true },
    parentTagName: { type: String, required: true },
    parentsTagNameArray: [{ type: String, required: true }], // 同上
    md:  { type: String, required: true },
    // because date con't be json.stringfy safe, so use String type
    date: { type: String, default: moment().tz("Asia/Shanghai").format() },

    loveNumber: Number,
    shareNumber: Number,
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


        var p1 = tagModel.find({}).exec();
        p1.then(function (docs) {
            oldTags = docs;
            for (var i = 0; i < oldTags.length; i++) {
                var item = oldTags[i];
                oldTagsNames.push(item.getValue(localConfig.tagKeyAttrName));
            }
        });
        var p2 = articleModel.find({}).exec();
        p2.then(function (docs) {
            oldArticles = docs;
            for (var i = 0; i < oldArticles.length; i++) {
                var item = oldArticles[i];
                oldArticlesTitles.push(item.getValue(localConfig.articleKeyAttrName));
            }
        });

        var addItems, deleteItems, updateItems;
        Promise.all([p1, p2])
            .then(function () {
                var tagOperateItems = getOperateItems(oldTagsNames, newTagsNames);
                var articleOperateItems = getOperateItems(oldArticlesTitles, newArticlesTitles);

                operateDatabase(localConfig.tagModelName, tagOperateItems, oldTags, newTags);
                operateDatabase(localConfig.articleModelName, articleOperateItems, oldArticles, newArticles);
            });
    });

    // 韦恩图给的灵感，来求增删改的元素，=。=，不过只能对主键处理，因为不支持 objects.difference
    // var array = require("array-extended");
    function getOperateItems(oldItems, newItems) {
        var addItems = array.difference(newItems, oldItems);
        var deleteItems = array.difference(oldItems, newItems);

        var allItems = array.union(newItems, oldItems);
        var differenceItems = array.union(addItems, deleteItems);

        var updateItems = array.difference(allItems, differenceItems);

        return {
            addItems: addItems,
            deleteItems: deleteItems,
            updateItems: updateItems
        };
    }

    function operateDatabase(modelName, operateItems, oldMogoObjects, newObjects) {
        var model = mongoose.model(modelName);
        var oldObjects = [];
        for (var i = 0; i < oldMogoObjects.length; i++) {
            oldObjects.push(oldMogoObjects[i]._doc);
        }

        var addItems = operateItems.addItems;
        var deleteItems = operateItems.deleteItems;
        var updateItems = operateItems.updateItems;

        for (i = 0; i < addItems.length; i++) {
            var addObject = findObject(addItems[i], modelName, newObjects);
            model.create(addObject);
        }

        for (i = 0; i < updateItems.length; i++) {
            var updateObject = findObject(updateItems[i], modelName, newObjects);
            var updateConditions = getConditions(updateObject, modelName);
            delete updateObject._id;
            model.update(updateConditions, updateObject, function (err, raw) {
                if (err) return handleError(err);
            });
        }

        for (i = 0; i < deleteItems.length; i++) {
            var deleteObject = findObject(deleteItems[i], modelName, oldObjects);
            var deleteConditions = getConditions(deleteObject, modelName);
            model.remove(deleteConditions, function (err, raw) {
                if (err) return handleError(err);
            });
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

        function getConditions(object, modelName) {
            var conditions = {};
            if (modelName === localConfig.tagModelName) {
                conditions[localConfig.tagKeyAttrName] = object[localConfig.tagKeyAttrName];
            } else if (modelName === localConfig.articleModelName) {
                conditions[localConfig.articleKeyAttrName] = object[localConfig.articleKeyAttrName];
            }
            return conditions;
        }
    }
}

module.exports = {
    tagSchema,
    articleSchema,
    renewDatabase
};
