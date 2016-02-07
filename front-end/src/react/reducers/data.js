import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'

import { ajaxPut } from '../../util/ajax'

import * as ActionTypes from '../../consts/ActionTypes'
import { FIRST_SHOWED_ARTICLES_MAX_NUMBER } from '../../consts/config'
import * as api from '../../consts/apis'

// 除了 data 掌管着的 state，router 也掌管着 currentTagId、currentArticleId，
// 分别影响着 aticleBox 和 articleListBox 组件
const initialState = Immutable.fromJS({
    articles: [],
    showedArticlesMaxNumber: FIRST_SHOWED_ARTICLES_MAX_NUMBER,
    tags: [],
})


export default createReducer(initialState, {
    [ActionTypes.LOAD_MUST_DATA]: (state, action) => state.merge({
        articles: action.articles,
        tags: action.tags,
    }),
    [ActionTypes.LOAD_ALL_ARTICLES]: (state, action) => state.merge({
        articles: action.articles
    }),

    [ActionTypes.SHOW_MORE_ARITICLES]: (state, action) => state.merge({
        showedArticlesMaxNumber: state.get('showedArticlesMaxNumber') + action.number
    }),

    [ActionTypes.ADD_ARITICLE_LOVE_NUMBER]: (state, action) => mergeStateByArticle(
        state, action._id, 'loveNumber', action.addNumber
    ),
    [ActionTypes.ADD_ARITICLE_SHARE_NUMBER]: (state, action) => mergeStateByArticle(
        state, action._id, 'shareNumber', action.addNumber
    ),
    [ActionTypes.CHANGE_ARTICLE_GRADE]: (state, action) => mergeStateByArticle(
        state, action._id, 'grade', action.changeGrade
    ),
})


function mergeStateByArticle(state, articleId, key, changeValue) {
    let newValue
    let articles = state.toJS().articles.map(item => {
        if (item._id === articleId) {
            item[key] += changeValue
            newValue = item[key]
        }
        return item
    })

    let url = api.API_ROOT_URL + api.ARTICLES_URL + articleId
    let changeInfo = {
        [key]: newValue
    }
    ajaxPut(url, changeInfo)

    return state.mergeDeep({
        articles
    })
}
