import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux'

import dataReducer from './data'
import contentTableReducer from './contentTable'

const rootReducer = combineReducers({
    data: dataReducer,
    contentTable: contentTableReducer,
    routing: routeReducer
})


export default rootReducer
