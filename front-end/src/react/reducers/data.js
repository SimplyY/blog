import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'

import { ajaxPut } from '../../util/ajax'

import * as types from '../../consts/ActionTypes'
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
    [types.LOAD_MUST_DATA]: (state, action) => state.merge({
        articles: action.payload.articles,
        tags: action.payload.tags
    }),
    [types.LOAD_ALL_ARTICLES]: (state, action) => state.merge({
        articles: action.payload
    }),

    [types.SHOW_MORE_ARTICLES]: (state, action) => state.merge({
        showedArticlesMaxNumber: state.get('showedArticlesMaxNumber') + action.payload
    }),

    [types.ADD_ARTICLE_LOVE_NUMBER]: (state, action) => mergeStateByArticle(
        state, action.payload._id, 'loveNumber', action.payload.addNumber
    ),
    [types.ADD_ARTICLE_SHARE_NUMBER]: (state, action) => mergeStateByArticle(
        state, action.payload._id, 'shareNumber', action.payload.addNumber
    )
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
