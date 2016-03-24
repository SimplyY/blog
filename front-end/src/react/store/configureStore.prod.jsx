import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'
import rootReducer from '../reducers'

export default function configureStore(initialState, history) {
    let reduxRouterMiddleware
    if (history === undefined) {
        reduxRouterMiddleware = syncHistory(browserHistory)
    }
    else {
        reduxRouterMiddleware = syncHistory(history)
    }
    const finalCreateStore = compose(
        applyMiddleware(reduxRouterMiddleware)
    )(createStore)

    return finalCreateStore(rootReducer, initialState)
}
