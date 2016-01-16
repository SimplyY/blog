import fse from 'fs-extra';
import { basename, dirname } from 'path';
import { readFile } from 'fs';

let tags = [];
let articles = [];

var config = require('../config');
const ROOT_DIR = config.blogRootPath;


function Tag({tagName, parentTagName, aritcleTitleList}) {
    [this.tagName, this.parentTagName, this.aritcleTitleList] = [tagName, parentTagName, aritcleTitleList];
}

function Article({title, parentTagName, md}) {
    [this.title, this.parentTagName, this.md] = [title, parentTagName, md];
}

fse.walk(ROOT_DIR)
    .on('data', function (item) {
        if (item.stats.isDirectory()) {
            // create tag and add in tags
            let tagName = basename(item.path);
            // 根目录不作为 tag
            if (basename(ROOT_DIR) === tagName) {
                return;
            }
            let parentTagName = basename(dirname(item.path));
            if (parentTagName === ROOT_DIR) {
                parentTagName = "";
            }

            tags.push(new Tag({tagName, parentTagName}));
        }

        if (item.stats.isFile()) {
            // create article and add in articles
            let title = basename(item.path);
            let parentTagName = basename(dirname(item.path));
            readFile(item.path, 'utf8', function (err, data) {
                if (err) throw err;
                var md = data;
                articles.push(new Article({title, parentTagName, md}));
            });
        }
    })
    .on('end', function () {
        console.log(tags);
        // console.log(articles);
    });

export {articles, tags};
