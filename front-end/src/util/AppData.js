import { ajaxGet } from './ajax'

import { API_ROOT_URL, TAGS_URL, ARTICLES_URL } from '../consts/apis'
import { TAG_STR, ARTICLE_STR, SORT_LIMIT_QUERY_STR, SORT_QUREY_STR, PATH_TYPE_IN_SPLIT_NUMBER } from '../consts/config'

export let AppData = {

    loadMustData() {
        return new Promise(function(resolve, reject) {
            let pTags = ajaxGet(API_ROOT_URL + TAGS_URL)
            let pArticle, pArticles

            let params = document.URL.split('/')
            let articleId
            // if page show article, load the article
            if (getPathTypeStr(params) === ARTICLE_STR) {
                articleId = getIdStr(params)
                pArticle = ajaxGet(API_ROOT_URL + ARTICLES_URL + articleId)
            }
            // if page in tag url show articlelist, load limited number article
            if (getPathTypeStr(params) === TAG_STR) {
                let latestArticleQurey = API_ROOT_URL + ARTICLES_URL + SORT_LIMIT_QUERY_STR
                pArticles = ajaxGet(latestArticleQurey)
            }

            Promise.all([pTags, pArticle, pArticles])
                .then(data => {
                    let mustData = {
                        tags: data[0],
                        articles: data[2]
                    }
                    if (data[2] === undefined) {
                        mustData.articles = [data[1]]
                    }

                    resolve(mustData)
                }).catch(error => {
                    reject(error)
                })
        });

        function getPathTypeStr(params) {
            return params[PATH_TYPE_IN_SPLIT_NUMBER]
        }
        function getIdStr(params) {
            return params[PATH_TYPE_IN_SPLIT_NUMBER + 1]
        }
    },

    loadAllArticles() {
        return new Promise(function(resolve, reject) {
            ajaxGet(API_ROOT_URL + ARTICLES_URL + SORT_QUREY_STR)
                .then((data) => {
                    data.forEach((item) => {
                        item.date = new Date(item.date)
                    })
                    resolve(data)
                }).catch(error => {
                    if (error !== undefined) {
                        reject(error)
                    }
                })
        })
    },

    getAriclesByTagId(allArticles, tags, tagId){
        let tagName;
        tags.forEach(item => {
            if (item._id === tagId) {
                tagName = item.tagName
            }
        })
        if (tagName === undefined) {
            return
        }

        let articles = [];
        allArticles.forEach(item => {
            if (item.parentsTagNameArray.find(item => item === tagName)) {
                articles.push(item)
            }
        })

        return articles
    },

    getAricleByArticleId(allArticles, articleId){
        return allArticles.find(item => item._id === articleId)
    }

}
