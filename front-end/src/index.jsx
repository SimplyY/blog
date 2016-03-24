import './util/resize-rem'
import './css/index.scss'

import React from 'react'
import { render } from 'react-dom'
import configureStore from './react/store/createConfigureStore'

import Root from './react/containers/root/Root'
import { AppData } from './util/AppData'
import { loadGoogle } from './util/google'
import { loadAllArticlesAction } from './react/actions/articles'

let { loadAllArticles } = AppData

const serverState = window.__INITIAL_STATE__
processServerState(serverState)

let store = configureStore(serverState)

let pRender = new Promise((resolve) => {
    render(
        <Root store={store} />,
        document.getElementById('root')
    )
    resolve()
})

pRender.then(loadAllArticles)
    .then(allArticles => {
        store.dispatch(loadAllArticlesAction(allArticles))
    })
    .then(loadGoogle)
    .catch(error => {
        if (error) {
            console.log(error)
            throw error
        }
    })


function processServerState(serverState) {
    if (serverState.data.articles[0].html !== undefined) {
        serverState.data.articles.forEach(item => {
            item.contentOfTable = JSON.parse(item.contentOfTable)
        })
    }
}
