import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'

import * as ActionTypes from '../../consts/ActionTypes'

const initialState = Immutable.fromJS({
    appear: false,
    isShow: false,
    content: undefined
})

export default createReducer(initialState, {
    [ActionTypes.APPEAR_CONTENT_TABLE]: state => state.merge({
        appear: true,
    }),
    [ActionTypes.DISAPPEAR_CONTENT_TABLE]: state => state.merge({
        appear: false,
        isShow: false,
        content: undefined
    }),

    [ActionTypes.SHOW_CONTENT_TABLE]: state => state.merge({
        isShow: true,
    }),
    [ActionTypes.HIDDEN_CONTENT_TABLE]: state => state.merge({
        isShow: false,
    }),

    [ActionTypes.LOAD_CONTENT_TABLE_CONTENT]: (state, action) => state.merge({
        content: action.content
    }),
})
