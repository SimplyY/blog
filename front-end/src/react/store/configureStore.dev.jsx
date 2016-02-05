import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'

import DevTools from '../containers/DevTools'
import rootReducer from '../reducers'

const reduxRouterMiddleware = syncHistory(browserHistory)
const finalCreateStore = compose(
    applyMiddleware(reduxRouterMiddleware),
    DevTools.instrument()
)(createStore)

export default function configureStore() {
    const store = finalCreateStore(rootReducer)

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
