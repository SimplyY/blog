import { ajaxGet } from './ajax'

import { API_ROOT_URL, TAGS_URL, ARTICLES_URL } from '../consts/apis'
import { TAG_STR, ARTICLE_STR, SORT_LIMIT_QUERY_STR, SORT_QUREY_STR, PATH_TYPE_IN_SPLIT_NUMBER } from '../consts/config'

export let AppData = {
    // load functions

    // 针对文章数量多且大的特点，于是做了加载优化，只加载了必须的文章
    // 通过 url 判断，如果为文章页面，只加载一篇文章（article）
    // 如果为 tag 页面或者根页面加载，只 limited articles
    loadMustData() {
        return new Promise(function(resolve, reject) {
            let pTags = ajaxGet(API_ROOT_URL + TAGS_URL)
            let { pArticle, pArticles } = getMustArticlesJudgeFromUrl(document.URL)

            if (pArticle === undefined && pArticles === undefined) {
                return
            }

            // tag 页面
            if (pArticle === undefined) {
                Promise.all([pTags, pArticles])
                    .then(datas => {
                        let [tags, articles] = datas
                        let mustData = { tags, articles }

                        // process data
                        processTags(mustData.tags)
                        processArticles(mustData.articles)

                        resolve(mustData)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }

            // 文章页面
            if (pArticles === undefined) {
                Promise.all([pTags, pArticle])
                    .then(datas => {
                        let [tags, article] = datas
                        let articles = [article]
                        let mustData = { tags, articles }

                        // process data
                        processTags(mustData.tags)
                        processArticles(mustData.articles)

                        resolve(mustData)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }
        });
    },

    loadAllArticles() {
        return new Promise(function(resolve, reject) {
            ajaxGet(API_ROOT_URL + ARTICLES_URL + SORT_QUREY_STR)
                .then((data) => {
                    processArticles(data)
                    resolve(data)
                })
                .catch(error => {
                    if (error !== undefined) {
                        reject(error)
                    }
                })
        })
    },

    // model functions

    getArticlesByTagId(allArticles, tags, tagId){
        let currentTag = AppData.getTagById(tags, tagId)
        if (currentTag === undefined) {
            return
        }

        let articles = [];
        allArticles.forEach(item => {
            if (item.parentsTagNameArray.find(item => item === currentTag.tagName)) {
                articles.push(item)
            }
        })

        return articles
    },

    getTagById(tags, tagId){
        return tags.find(item => item._id === tagId)
    },

    getTagByTagName(tags, tagName){
        return tags.find(item => item.tagName === tagName)
    },

    getAricleByArticleId(articles, articleId){
        return articles.find(item => item._id === articleId)
    },

    formatArticleDate(date){
        return date.toISOString().substring(0, 10)
    },
}

// 文章页面只加载一篇文章（article）
// tag 页面或者根页面加载 limited articles
function getMustArticlesJudgeFromUrl(url) {
    let pArticle, pArticles

    let params = url.split('/')
    // pathTypeStr is tag or '' or article or other
    let pathTypeStr = getPathTypeStr(params)
    if (pathTypeStr === ARTICLE_STR) {
        let articleId = getIdStr(params)
        pArticle = ajaxGet(API_ROOT_URL + ARTICLES_URL + articleId)
        // pArticles will be undefined
    } else if (pathTypeStr === TAG_STR || pathTypeStr === '') {
        var latestArticleQurey = API_ROOT_URL + ARTICLES_URL + SORT_LIMIT_QUERY_STR
        pArticles = ajaxGet(latestArticleQurey)
        // pArticle will be undefined
    } else {
        // other situation will all undefined
    }

    return { pArticle, pArticles }

    function getPathTypeStr(params) {
        return params[PATH_TYPE_IN_SPLIT_NUMBER]
    }
    function getIdStr(params) {
        return params[PATH_TYPE_IN_SPLIT_NUMBER + 1]
    }
}

function processTags(tags) {
    // process tags
    tags.sort((a, b) => b.articleTitleList.length - a.articleTitleList.length)
    tags.forEach(item => {
        if (item.tagRank === 2) {
             let parentTag = AppData.getTagByTagName(tags, item.parentTagName)

             if (parentTag.childrenTags === undefined) {
                 parentTag.childrenTags = [item]
             } else {
                 parentTag.childrenTags.push(item)
             }
        }
    })
}

function processArticles(articles) {
    convertDateStrType(articles)
}

function convertDateStrType(data){
    data.forEach((item) => {
        item.date = new Date(item.date)
    })
}
