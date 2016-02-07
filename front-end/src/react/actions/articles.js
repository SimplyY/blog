import * as ActionTypes from '../../consts/ActionTypes'

export function loadMustDataAction(data) {
    return {
        type: ActionTypes.LOAD_MUST_DATA,
        articles: data.articles,
        currentArticle: data.currentArticle,
        tags: data.tags
    }
}

export function loadAllArticlesAction(articles) {
    return {
        type: ActionTypes.LOAD_ALL_ARTICLES,
        articles
    }
}

export function showMoreAriticleAction(number) {
    return {
        type: ActionTypes.SHOW_MORE_ARITICLES,
        number
    }
}

export function addAriticleLoveNumberAction(_id, addNumber) {
    return {
        type: ActionTypes.ADD_ARITICLE_LOVE_NUMBER,
        _id,
        addNumber
    }
}

export function addAriticleShareNumberAction(_id, addNumber) {
    return {
        type: ActionTypes.ADD_ARITICLE_SHARE_NUMBER,
        _id,
        addNumber
    }
}

export function changeArticleGradeAction(_id, changeGrade) {
    return {
        type: ActionTypes.CHANGE_ARTICLE_GRADE,
        _id,
        changeGrade
    }
}
