import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import createConfigureStore from './react/store/createConfigureStore'

import { appData } from './data'
import Root from './react/containers/root/Root'

import './scss/reset.scss'

appData.loadMustData()
    .then(() => {
        const store = createConfigureStore()
        render(
            <Root store={store} />,
            document.getElementById('root')
        )
    })
    .then(() => {
        appData.loadAllArticles()
            // .then(() => console.dir(appData))
    })
    .catch(error => {
        if (error !== undefined) {
            console.log(error);
        }
    })
