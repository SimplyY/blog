import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'

import tags from './tags'

const rootReducer = combineReducers({
    tags,
    routing: routeReducer
})


export default rootReducer
