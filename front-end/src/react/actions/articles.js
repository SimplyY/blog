import { LOAD_MUST_ARTICLES, LOAD_ALL_ARTICLES } from '../../consts/ActionTypes'

export function loadMustArticlesAction(articles) {
    return {
        type: LOAD_MUST_ARTICLES,
        articles
    }
}

export function loadAllArticlesAction(articles) {
    return {
        type: LOAD_ALL_ARTICLES,
        articles
    }
}
