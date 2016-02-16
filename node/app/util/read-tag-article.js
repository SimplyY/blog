'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTagAndArticle = undefined;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _eventproxy = require('eventproxy');

var _eventproxy2 = _interopRequireDefault(_eventproxy);

var _path = require('path');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* jshint esnext: true */

exports.getTagAndArticle = getTagAndArticle;

var config = require('../../../config');
var ROOT_DIR = config.blogRootPath;

function getTagAndArticle(callback) {
    var tags = [];
    var articlesPaths = [];
    var articles = [];

    _fsExtra2.default.walk(ROOT_DIR).on('data', function (item) {
        if (item.stats.isDirectory()) {
            // create tag and add in tags
            var tag = createTag(item.path);
            if (tag !== undefined) {
                tags.push(tag);
            }
        }

        if (item.stats.isFile()) {
            // create article and add in articles
            if ((0, _path.extname)(item.path) !== '.md') {
                return;
            }
            articlesPaths.push(item.path);
        }
    }).on('end', function () {
        var ep = new _eventproxy2.default();

        ep.after('got_file', articlesPaths.length, function () {
            callback(tags, articles);
        });

        var _loop = function _loop(i) {
            (0, _fs.readFile)(articlesPaths[i], 'utf8', function (err, data) {
                if (err) console.log(err);
                var title = getTile(articlesPaths[i]);
                var parentTagName = (0, _path.basename)((0, _path.dirname)(articlesPaths[i]));
                var md = data;
                var parentsTagNameArray = getParentsTagNameArray(ROOT_DIR, articlesPaths[i]);
                var article = { title: title, md: md, parentTagName: parentTagName, parentsTagNameArray: parentsTagNameArray };
                articles.push(article);

                ep.emit('got_file');
            });
        };

        for (var i = 0; i < articlesPaths.length; i++) {
            _loop(i);
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
        var tagRank = parentsTagNameArray.length + 1;

        var articleTitleList = [];
        _fsExtra2.default.walk(path).on('data', function (item) {
            if (item.stats.isFile()) {
                // create article and add in articles
                if ((0, _path.extname)(item.path) !== '.md') {
                    return;
                }

                var title = getTile(item.path);
                articleTitleList.push(title);
            }
        });

        return { tagName: tagName, parentTagName: parentTagName, articleTitleList: articleTitleList, parentsTagNameArray: parentsTagNameArray, tagRank: tagRank };
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
}
