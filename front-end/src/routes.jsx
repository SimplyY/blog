import React from 'react'
import { Route } from 'react-router'

import App from './react/containers/App'
import ArticleListBox from './react/containers/ArticleListBox'
import ArticleBox from './react/containers/ArticleBox'
import Chart from './react/containers/Chart'

import { TAG_PATH, ARTICLE_PATH, CHART_PATH } from './consts/config'

export default (
    <Route path="/" component={App} >
        <Route path={TAG_PATH + ':_id'} component={ArticleListBox}/>
        <Route path={ARTICLE_PATH + ':_id'} component={ArticleBox}/>
        <Route path={CHART_PATH} component={Chart}/>
    </Route>
)
