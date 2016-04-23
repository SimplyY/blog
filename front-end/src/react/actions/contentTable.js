import { createAction } from 'redux-actions'

import * as types from '../../consts/ActionTypes'

export const showContentTableAction = createAction(types.SHOW_CONTENT_TABLE)

export const hiddenContentTableAction = createAction(types.HIDDEN_CONTENT_TABLE)
