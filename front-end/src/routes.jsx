import React from 'react'
import { Route, Redirect, IndexRoute } from 'react-router'

import App from './react/containers/App'
import ArticleList from './react/containers/ArticleList'
import Article from './react/containers/Article'
import Chart from './react/containers/Chart'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={ArticleList}/>
        <Route path="tag/" component={ArticleList}/>
        <Route path="article/" component={Article}/>
        <Route path="chart" component={Chart}/>
        <Redirect from="/*" to="tag/编程" />
    </Route>
)
