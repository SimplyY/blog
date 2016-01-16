'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tags = exports.articles = undefined;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _fs = require('fs');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var TEST_DIR = '../Article';

var tags = [];
var articles = [];

function Tag(_ref) {
    var tagName = _ref.tagName;
    var parentTagName = _ref.parentTagName;
    var _ref2 = [tagName, parentTagName];
    this.tagName = _ref2[0];
    this.parentTagName = _ref2[1];
}

function Article(_ref3) {
    var title = _ref3.title;
    var parentTagName = _ref3.parentTagName;
    var md = _ref3.md;
    var _ref4 = [title, parentTagName, md];
    this.title = _ref4[0];
    this.parentTagName = _ref4[1];
    this.md = _ref4[2];
}

_fsExtra2.default.walk(TEST_DIR).on('data', function (item) {
    if (item.stats.isDirectory()) {
        // create tag and add in tags
        var tagName = (0, _path.basename)(item.path);
        // 根目录不作为 tag
        if ((0, _path.basename)(TEST_DIR) === tagName) {
            return;
        }
        var parentTagName = (0, _path.basename)((0, _path.dirname)(item.path));
        tags.push(new Tag({ tagName: tagName, parentTagName: parentTagName }));
    }

    if (item.stats.isFile()) {
        (function () {
            // create article and add in articles
            var title = (0, _path.basename)(item.path);
            var parentTagName = (0, _path.basename)((0, _path.dirname)(item.path));
            (0, _fs.readFile)(item.path, 'utf8', function (err, data) {
                if (err) throw err;
                var md = data;
                articles.push(new Article({ title: title, parentTagName: parentTagName, md: md }));
            });
        })();
    }
}).on('end', function () {
    console.log(tags);
    // console.log(articles);
});

exports.articles = articles;
exports.tags = tags;
