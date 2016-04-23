import { createAction } from 'redux-actions'

import * as types from '../../consts/ActionTypes'

export const loadMustDataAction = createAction(types.LOAD_MUST_DATA)

export const loadAllArticlesAction = createAction(types.LOAD_ALL_ARTICLES)

export const showMoreArticleAction = createAction(types.SHOW_MORE_ARTICLES)

export const addArticleLoveNumberAction = createAction(types.ADD_ARTICLE_LOVE_NUMBER)

export const addArticleShareNumberAction = createAction(types.ADD_ARTICLE_SHARE_NUMBER)
