/* jshint esnext: true */

import fse from 'fs-extra';
import EventProxy from 'eventproxy';
import { basename, dirname, extname } from 'path';
import { readFile } from 'fs';

export { getTagAndArticle };

var config = require('../../../config');
const ROOT_DIR = config.blogRootPath;

function getTagAndArticle(callback) {
    let tags = [];
    let articlesPaths =[];
    let articles = [];

    fse.walk(ROOT_DIR)
        .on('data', function (item) {
            if (item.stats.isDirectory()) {
                // create tag and add in tags
                let tag = createTag(item.path);
                if (tag !== undefined) {
                    tags.push(tag);
                }
            }

            if (item.stats.isFile()) {
                // create article and add in articles
                if (extname(item.path) !== '.md') {
                    return;
                }
                articlesPaths.push(item.path);
            }
        })
        .on('end', function () {
            let ep = new EventProxy();

            ep.after('got_file', articlesPaths.length, function() {
                callback(tags, articles);
            });

            for (let i = 0; i < articlesPaths.length; i++) {
                readFile(articlesPaths[i], 'utf8', function (err, data) {
                    if (err) console.log(err);
                    let title = getTile(articlesPaths[i]);
                    let parentTagName = basename(dirname(articlesPaths[i]));
                    let md = data;
                    let parentsTagNameArray = getParentsTagNameArray(ROOT_DIR, articlesPaths[i]);
                    let article = { title, md, parentTagName, parentsTagNameArray };
                    articles.push(article);

                    ep.emit('got_file');
                });
            }
        });


    function createTag(path) {
        let tagName = basename(path);
        let parentTagName = basename(dirname(path));
        // 根目录不作为 tag
        if (basename(ROOT_DIR) === tagName) {
            return;
        }
        // 使第一级 tag 的父目录为空
        if (parentTagName === ROOT_DIR) {
            parentTagName = "";
        }
        let parentsTagNameArray = getParentsTagNameArray(ROOT_DIR, path);
        let tagRank = parentsTagNameArray.length + 1;

        let articleTitleList = [];
        fse.walk(path)
            .on('data', function (item) {
                if (item.stats.isFile()) {
                    // create article and add in articles
                    if (extname(item.path) !== '.md') {
                        return;
                    }

                    let title = getTile(item.path);
                    articleTitleList.push(title);
                }
            });

        return { tagName, parentTagName, articleTitleList, parentsTagNameArray, tagRank };
    }

    function getParentsTagNameArray(ROOT_DIR, path) {
        var array = [];
        let parentPath = dirname(path);
        while (parentPath !== ROOT_DIR) {
            array.unshift(basename(parentPath));
            parentPath = dirname(parentPath);
        }
        return array;
    }

    function getTile(baseName) {
         return basename(baseName, '.md');
    }

}
