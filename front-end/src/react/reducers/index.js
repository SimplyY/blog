import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux'

import dataReducer from './data'

const rootReducer = combineReducers({
    data: dataReducer,
    routing: routeReducer
})


export default rootReducer
