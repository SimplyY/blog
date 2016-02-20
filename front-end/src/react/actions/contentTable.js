import * as ActionTypes from '../../consts/ActionTypes'

export function appearContentTableAction() {
    return {
        type: ActionTypes.APPEAR_CONTENT_TABLE,
    }
}

export function disappearContentTableAction() {
    return {
        type: ActionTypes.DISAPPEAR_CONTENT_TABLE,
    }
}

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


export function loadContentTableContentAction(content) {
    return {
        type: ActionTypes.LOAD_CONTENT_TABLE_CONTENT,
        content
    }
}
