import { API_ROOT_URL, TAGS_URL, ARTICLES_URL } from './consts/apis'
import { ajaxGet } from './util/ajax'

export let data = {
    tags: [],
    articles: [],

    loadData() {
        return new Promise(function(resolve, reject) {

            let pTag = ajaxGet(API_ROOT_URL + TAGS_URL)
            let pArticle = ajaxGet(API_ROOT_URL + ARTICLES_URL)

            Promise.all([pTag, pArticle])
                .then(data => {
                    [this.tags, this.articles] = [data[0], data[1]]
                    resolve()
                }).catch(error => {
                    reject()
                })
        });
    }
}
