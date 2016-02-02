import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import createConfigureStore from './react/store/createConfigureStore'

import { data } from './data'
import Root from './react/containers/root/Root'

import './scss/reset.scss'

data.loadData()
    .then(() => {
        const store = createConfigureStore()
        render(
            <Root store={store} tags={data[0]} />,
            document.getElementById('root')
        )
    }).catch(error => {
        if (error !== undefined) {
            alert(error)
        }
    })
