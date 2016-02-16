import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import createConfigureStore from './react/store/createConfigureStore'

import Root from './react/containers/root/Root'
import { AppData } from './util/AppData'
import { loadMustDataAction, loadAllArticlesAction } from './react/actions/articles'

import './css/lib/github-markdown.css'
import './css/lib/github-gist.css'
import './css/index.scss'

let store = createConfigureStore();

// 先加载 mustData 再加载 allArticles
AppData.loadMustData()
    .then((data) => {
        store.dispatch(loadMustDataAction(data))
        render(
            <Root store={store} />,
            document.getElementById('root')
        )
    })
    .then(() => {
        AppData.loadAllArticles()
            .then((allArticles) => {
                store.dispatch(loadAllArticlesAction(allArticles))
            })
    })
    .catch(error => {
        if (error !== undefined) {
            console.log(error)
        }
    })
