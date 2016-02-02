import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import createConfigureStore from './react/store/createConfigureStore'

import Root from './containers/root/Root'
import './scss/reset.scss'

const store = createConfigureStore()
let tags, articles

console.dir(store.getState())
render(
    <Root store={store} />,
    document.getElementById('root')
)
