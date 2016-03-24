import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'

import DevTools from '../containers/DevTools'
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
        applyMiddleware(reduxRouterMiddleware),
        DevTools.instrument()
    )(createStore)

    const store = finalCreateStore(rootReducer, initialState)

    // Required for replaying actions from devtools to work
    reduxRouterMiddleware.listenForReplays(store)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
