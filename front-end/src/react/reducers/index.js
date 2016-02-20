import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux'

import dataReducer from './data'
import contantTableReducer from './contantTable'

const rootReducer = combineReducers({
    data: dataReducer,
    contentTable: contantTableReducer,
    routing: routeReducer
})


export default rootReducer
