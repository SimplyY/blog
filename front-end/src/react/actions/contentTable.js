import * as ActionTypes from '../../consts/ActionTypes'

export function showContentTableAction() {
    return {
        type: ActionTypes.SHOW_CONTENT_TABLE,
    }
}

export function hiddenContentTableAction() {
    return {
        type: ActionTypes.HIDDEN_CONTENT_TABLE,
    }
}
