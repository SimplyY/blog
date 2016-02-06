import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'

import { LOAD_MUST_DATA, LOAD_ALL_ARTICLES, SHOW_MORE_ARITICLES } from '../../consts/ActionTypes'
import { FIRST_SHOWED_ARTICLES_MAX_NUMBER } from '../../consts/config'

// 除了 data 掌管着的 state，router 也掌管着 currentTagId、currentArticleId，
// 分别影响着 aticleBox 和 articleListBox 组件
const initialState = Immutable.fromJS({
    articles: [],
    showedArticlesMaxNumber: FIRST_SHOWED_ARTICLES_MAX_NUMBER,
    tags: []
})


export default createReducer(initialState, {
    [LOAD_MUST_DATA]: (state, action) => state.merge({
        articles: action.articles,
        tags: action.tags,
    }),

    [LOAD_ALL_ARTICLES]: (state, action) => state.merge({
        articles: action.articles
    }),

    [SHOW_MORE_ARITICLES]: (state, action) => state.merge({
        showedArticlesMaxNumber: state.get('showedArticlesMaxNumber') + action.number
    })
})
