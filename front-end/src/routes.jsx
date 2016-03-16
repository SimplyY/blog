import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './react/containers/App'
import ArticleListBox from './react/containers/ArticleListBox'
import ArticleBox from './react/containers/ArticleBox'

import ToolsBox from './react/containers/ToolsBox'
import Chart from './react/containers/Chart'
import InvalidUrlBox from './react/containers/InvalidUrlBox'

import Md2pdf from './react/components/tools/Md2pdf'

import { TAG_PATH, ARTICLE_PATH, CHART_PATH, HOT_PATH, TOOLS_PATH, MD2PDF_STR } from './consts/config'

export default (
    <Route path="/" component={App} >
        <IndexRoute component={ArticleListBox} />
        <Route path={TAG_PATH + ':tagId'} component={ArticleListBox} />
        <Route path={ARTICLE_PATH + ':articleId'} component={ArticleBox} />
        <Route path={HOT_PATH} component={ArticleListBox} />

        <Route path={TOOLS_PATH} component={ToolsBox}>
            <Route path={MD2PDF_STR} component={Md2pdf}/>
        </Route>
        <Route path={CHART_PATH} component={Chart}/>
        <Route path='*' component={InvalidUrlBox}/>
    </Route>
)
