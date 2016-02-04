import { ajaxGet } from './util/ajax'

import { API_ROOT_URL, TAGS_URL, ARTICLES_URL } from './consts/apis'
import { ARTICLE_PATH, TAG_PATH, SORT_LIMIT_QUERY_STR, SORT_QUREY_STR } from './consts/config'

export let appData = {
    tags: [],
    currentArticle: undefined,
    articles: [], // sorted

    loadMustData() {
        return new Promise(function(resolve, reject) {
            let pTags = ajaxGet(API_ROOT_URL + TAGS_URL)
            let pArticle, pArticles
            let params = document.URL.split('/')
            if (params[params.length - 2] + '/' === ARTICLE_PATH) {
                let articleId = params[params.length - 1]
                pArticle = ajaxGet(API_ROOT_URL + ARTICLES_URL + articleId)
            }
            if (params[params.length - 2] + '/' === TAG_PATH) {
                let latestArticleQurey = API_ROOT_URL + ARTICLES_URL + SORT_LIMIT_QUERY_STR
                pArticles = ajaxGet(latestArticleQurey)
            }

            Promise.all([pTags, pArticle, pArticles])
                .then(data => {
                    appData.tags = data[0]
                    appData.currentArticle = data[1]
                    appData.articles = data[2]
                    resolve()
                }).catch(error => {
                    reject(error)
                })
        });
    },

    loadAllArticles() {
        return ajaxGet(API_ROOT_URL + ARTICLES_URL + SORT_QUREY_STR)
            .then((data) => {
                data.forEach((item) => {
                    item.date = new Date(item.date)
                })
                appData.articles = data
            }).catch(error => {
                if (error !== undefined) {
                    alert(error)
                }
            })
    },

    getAriclesByTagId(allArticles, tagId){
        let tagName;
        appData.tags.forEach(item => {
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
    }
}
