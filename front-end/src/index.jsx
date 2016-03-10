import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import createConfigureStore from './react/store/createConfigureStore'

import Root from './react/containers/root/Root'
import { AppData } from './util/AppData'
import { loadGoogleAnalyse } from './util/google'
import { loadMustDataAction, loadAllArticlesAction } from './react/actions/articles'

import './css/index.scss'

let { loadMustData, loadAllArticles } = AppData

let store = createConfigureStore()

// loadMustData 返回一个 promise
// 先加载 mustData，再 render 页面，再加载 allData,etc
loadMustData()
    .then(data => {
        store.dispatch(loadMustDataAction(data))
        render(
            <Root store={store} />,
            document.getElementById('root')
        )
    })
    .then(loadAllArticles)
    .then(allArticles => {
        store.dispatch(loadAllArticlesAction(allArticles))
    })
    .then(loadGoogleAnalyse)
    .catch(error => {
        if (error) {
            console.log(error)
        }
    })
