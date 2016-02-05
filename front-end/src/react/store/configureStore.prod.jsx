import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const finalCreateStore = compose(
    applyMiddleware(thunk, syncHistory(browserHistory))
)(createStore)

export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState)
}
