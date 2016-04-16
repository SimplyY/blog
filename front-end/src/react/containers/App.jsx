import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    showContentTableAction, hiddenContentTableAction
} from '../actions/contentTable'

import NavigationBar from '../components/NavigationBar'
import InfoSideBar from '../components/InfoSideBar'
import ContentTable from '../components/ContentTable'
import ScrollTopButton from '../components/ScrollTopButton'

import { AppData } from '../../util/AppData'
import { getPathType } from '../../util/common'

import { ARTICLE_STR } from '../../consts/config'

class App extends Component {
    constructor() {
        super()
    }
    render() {
        const {
            pathname,
            children, tags, articles, contentTable,
            showContentTable, hiddenContentTable, loadContentTableContent
        } = this.props

        let isAppear = false
        if (getPathType(pathname) === ARTICLE_STR) {
            isAppear = true
            const { articleId } = this.props.params
            let currentArticle = AppData.getAricleByArticleId(articles, articleId)
            if (currentArticle && currentArticle.contentOfTable !== undefined) {
                contentTable.content = currentArticle.contentOfTable
            }
        }


        return (
            <div className="main-wrapper">
                <NavigationBar tags={tags} />
                <ContentTable isAppear={isAppear}
                    contentTable={contentTable}
                    showContentTable={showContentTable}
                    hiddenContentTable={hiddenContentTable}
                    loadContentTableContent={loadContentTableContent}/>
                <div id="main-body" className="main-body clear-float">
                    <div className="main-container">
                        {children}
                    </div>
                    <InfoSideBar tags={tags} />
                </div>
                <ScrollTopButton />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tags: state.data.get('tags').toJS(),
        articles: state.data.get('articles').toJS(),
        contentTable: state.contentTable.toJS(),
        pathname: state.routing.location.pathname
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showContentTable: bindActionCreators(showContentTableAction, dispatch),
        hiddenContentTable: bindActionCreators(hiddenContentTableAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
