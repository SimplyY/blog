import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'

import articles from './articles'

const rootReducer = combineReducers({
    articles,
    routing: routeReducer
})


export default rootReducer
