import { ajaxGet } from './ajax'

import { isNodeEnv } from './common'

import { API_ROOT_URL, ARTICLES_URL } from '../consts/apis'
import { SORT_QUREY_STR, TAG_PATH } from '../consts/config'

export let AppData = {
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

    getHotSortedArticles(allArticles) {
        return allArticles.sort((a, b) => getHotWeight(b) - getHotWeight(a))

        function getHotWeight(article) {
            if (article.comments) {
                return article.loveNumber + article.shareNumber + article.comments.length
            }
            else {
                return article.loveNumber + article.shareNumber
            }
        }
    },

    getTagById(tags, tagId){
        return tags.find(item => item._id === tagId)
    },

    getTagByTagName(tags, tagName){
        return tags.find(item => item.tagName === tagName)
    },

    getAricleByArticleId(articles, articleId){
        return articles.find(item => item._id == articleId)
    },

    formatArticleDate(date){
        return new Date(date).toISOString().substring(0, 10)
    },
}

export function processTags(tags) {
    if (!tags || tags.length === 0) {
        return
    }
    // process tags
    tags.sort((a, b) => b.articleTitleList.length - a.articleTitleList.length)
    tags.forEach(item => {
        item.url = '/' + TAG_PATH + item._id

        // make first rank tag has childrenTags attribute
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

export function processArticles(articles) {
    if (!articles || articles.length === 0) {
        return
    }
    addContentOfTableAttr(articles)

    addNearArticleAttr(articles)
}

function addContentOfTableAttr(articles) {
    articles.map(item => {
        if (item.contentOfTable) {
            item.contentOfTable = JSON.parse(item.contentOfTable)
        }
        return item
    })
}

function addNearArticleAttr(articles) {
    articles.forEach((item, index, array) => {
        let nearArticle = {}

        if (index === 0) {
            nearArticle.after = null
        }
        else {
            nearArticle.after = {
                _id: array[index - 1]._id,
                title: array[index - 1].title
            }
        }
        if (index === array.length - 1) {
            nearArticle.before = null
        }
        else {
            nearArticle.before = {
                _id: array[index + 1]._id,
                title: array[index + 1].title
            }
        }

        item.nearArticle = nearArticle
    })
}
