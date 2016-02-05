import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import createConfigureStore from './react/store/createConfigureStore'

import Root from './react/containers/root/Root'
import { appData } from './data'
import { loadMustArticlesAction, loadAllArticlesAction } from './react/actions/articles'

import './scss/reset.scss'

let store = createConfigureStore();

appData.loadMustData()
    .then(() => {
        store.dispatch(loadMustArticlesAction(appData.articles))
        render(
            <Root store={store} />,
            document.getElementById('root')
        )
    })
    .then(() => {
        appData.loadAllArticles()
            .then(() => {
                store.dispatch(loadAllArticlesAction(appData.articles))
            })
    })
    .catch(error => {
        if (error !== undefined) {
            throw error
        }
    })
