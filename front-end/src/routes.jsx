import React from 'react'
import { Route } from 'react-router'

import App from './react/containers/App'
import ArticleList from './react/containers/ArticleList'
import Article from './react/containers/Article'
import Chart from './react/containers/Chart'

import { TAG_PATH, ARTICLE_PATH, CHART_PATH } from './consts/config'

export default (
    <Route path="/" component={App} >
        <Route path={TAG_PATH + ':_id'} component={ArticleList}/>
        <Route path={ARTICLE_PATH + ':_id'} component={Article}/>
        <Route path={CHART_PATH} component={Chart}/>
    </Route>
)
