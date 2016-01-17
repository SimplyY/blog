'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tags = exports.articles = undefined;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tags = [];
var articles = [];

var config = require('../config');
var ROOT_DIR = config.blogRootPath;

_fsExtra2.default.walk(ROOT_DIR).on('data', function (item) {
    if (item.stats.isDirectory()) {
        // create tag and add in tags
        var tag = createTag(item.path);
        if (tag !== undefined) {
            tags.push(tag);
        }
    }

    if (item.stats.isFile()) {
        var _ret = function () {
            // create article and add in articles
            if ((0, _path.extname)(item.path) !== '.md') {
                return {
                    v: undefined
                };
            }

            var title = getTile(item.path);
            var parentTagName = (0, _path.basename)((0, _path.dirname)(item.path));
            (0, _fs.readFile)(item.path, 'utf8', function (err, data) {
                if (err) throw err;
                var md = data;
                var parentsTagNameArray = getParentsTagNameArray(ROOT_DIR, item.path);
                var article = { title: title, md: md, parentTagName: parentTagName, parentsTagNameArray: parentsTagNameArray };
                articles.push(article);
            });
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
});

function createTag(path) {
    var tagName = (0, _path.basename)(path);
    var parentTagName = (0, _path.basename)((0, _path.dirname)(path));
    // 根目录不作为 tag
    if ((0, _path.basename)(ROOT_DIR) === tagName) {
        return;
    }
    // 使第一级 tag 的父目录为空
    if (parentTagName === ROOT_DIR) {
        parentTagName = "";
    }
    var parentsTagNameArray = getParentsTagNameArray(ROOT_DIR, path);
    var aritcleTitleList = [];
    _fsExtra2.default.walk(path).on('data', function (item) {
        if (item.stats.isFile()) {
            // create article and add in articles
            if ((0, _path.extname)(item.path) !== '.md') {
                return;
            }

            var title = getTile(item.path);
            aritcleTitleList.push(title);
        }
    });

    return { tagName: tagName, parentTagName: parentTagName, aritcleTitleList: aritcleTitleList, parentsTagNameArray: parentsTagNameArray };
}

function getParentsTagNameArray(ROOT_DIR, path) {
    var array = [];
    var parentPath = (0, _path.dirname)(path);
    while (parentPath !== ROOT_DIR) {
        array.unshift((0, _path.basename)(parentPath));
        parentPath = (0, _path.dirname)(parentPath);
    }
    return array;
}

function getTile(baseName) {
    return (0, _path.basename)(baseName, '.md');
}

exports.articles = articles;
exports.tags = tags;
