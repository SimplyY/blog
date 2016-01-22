import fse from 'fs-extra';
import { basename, dirname, extname } from 'path';
import { readFile } from 'fs';

export { getTagAndArticle };


function getTagAndArticle(callback) {
    let tags = [];
    let articles = [];

    var config = require('../../../config');
    const ROOT_DIR = config.blogRootPath;

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

                let title = getTile(item.path);
                let parentTagName = basename(dirname(item.path));
                readFile(item.path, 'utf8', function (err, data) {
                    if (err) throw err;
                    let md = data;
                    let parentsTagNameArray = getParentsTagNameArray(ROOT_DIR, item.path);
                    let article = { title, md, parentTagName, parentsTagNameArray };
                    articles.push(article);
                });
            }
        })
        .on('end', function () {
            callback(tags, articles);
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

        let aritcleTitleList = [];
        fse.walk(path)
            .on('data', function (item) {
                if (item.stats.isFile()) {
                    // create article and add in articles
                    if (extname(item.path) !== '.md') {
                        return;
                    }

                    let title = getTile(item.path);
                    aritcleTitleList.push(title);
                }
            });

        return { tagName, parentTagName, aritcleTitleList, parentsTagNameArray, tagRank };
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
