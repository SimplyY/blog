import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'

import { getPathType, isNodeEnv } from '../../util/common'
import { ARTICLE_STR, TAG_STR } from '../../consts/config'

import * as ActionTypes from '../../consts/ActionTypes'


// wrap dom class
const wrapperId = 'main-body'
export const wrapperMoveClass = ' wrapper-move'

const initialState = Immutable.fromJS({
    isShow: false
})

let updateLocationTimes = 0

export default createReducer(initialState, {
    [ActionTypes.SHOW_CONTENT_TABLE]: state => {
        let newIsShow = !state.get('isShow')
        toggleContentTableStyle(newIsShow)
        return state.merge({
            isShow: newIsShow
        })
    },
    [ActionTypes.HIDDEN_CONTENT_TABLE]: state => {
        let newIsShow = !state.get('isShow')
        toggleContentTableStyle(newIsShow)
        return state.merge({
            isShow: newIsShow
        })
    },
    ['@@router/UPDATE_LOCATION']: (state, action) => {
        updateLocationTimes ++

        let newIsShow = false
        if (updateLocationTimes === 1) {
            return state.merge({
                isShow: newIsShow
            })
        }

        if (getPathType(action.payload.pathname) === ARTICLE_STR) {
            newIsShow = state.get('isShow')
        }
        toggleContentTableStyle(newIsShow)
        return state.merge({
            isShow: newIsShow
        })
    },
})


function toggleContentTableStyle(newIsShow) {
    if (newIsShow === true) {
        wrapperMove()
    } else {
        wrapperReset()
    }
}

function wrapperMove() {
    if (isNodeEnv()) {
        return
    }
    let wrapperDOM = document.getElementById(wrapperId)
    if (wrapperDOM === null) {
        return
    }
    wrapperDOM.className = wrapperDOM.className.replace(wrapperMoveClass, '');
    wrapperDOM.className += wrapperMoveClass
}

function wrapperReset() {
    if (isNodeEnv()) {
        return
    }
    let wrapperDOM = document.getElementById(wrapperId)
    if (wrapperDOM === null) {
        return
    }
    wrapperDOM.className = wrapperDOM.className.replace(wrapperMoveClass, '');
}
