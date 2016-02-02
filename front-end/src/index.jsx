import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import createConfigureStore from './react/store/createConfigureStore'

import Root from './react/containers/root/Root'
import { API_ROOT_URL, TAG_URL, ARTICLE_URL } from './consts/apis'
import { ajaxGet } from './util/ajax'

import './scss/reset.scss'

loadData()
    .then((data) => {
        console.log(data)
        renderApp(data)
    }).catch(error => {
        console.log(error)
    })

function renderApp(data) {
    const store = createConfigureStore()
    render(
        <Root store={store} tags={data[0]} />,
        document.getElementById('root')
    )
}

function loadData() {
    return new Promise(function(resolve, reject) {
        let tags, articles
        let pTag = ajaxGet(API_ROOT_URL + TAG_URL)
        let pArticle = ajaxGet(API_ROOT_URL + ARTICLE_URL)

        Promise.all([pTag, pArticle])
            .then(data => {
                tags = data[0]
                articles = data[1]
                resolve({
                    tags,
                    articles
                })
            }).catch(error => {
                console.log('ajaxGet error', error)
                reject()
            })
    });
}
