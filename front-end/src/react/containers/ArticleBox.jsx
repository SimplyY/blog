import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import _ from '../../../lib/lodash.core'

import { AppData } from '../../util/AppData'

import { addArticleLoveNumberAction, addArticleShareNumberAction } from '../actions/articles'
import { showContentTableAction } from '../actions/contentTable'

import InvalidUrlBox from '../containers/InvalidUrlBox'

import Article from '../components/Article'
import CurrentTagChain from '../components/CurrentTagChain'
import ShareLoveBox from '../components/ShareLoveBox'
import NearArticleBox from '../components/NearArticleBox'

import { getPathType, setPageTitle, isFirstPage } from '../../util/common'

class ArticleBox extends Component {
    constructor() {
        super()
        this.isInvalidUrl = false
    }

    shouldComponentUpdate(nextProps){
        let nextArticle = AppData.getAricleByArticleId(nextProps.articles, nextProps.params.articleId)
        let oldArticle = AppData.getAricleByArticleId(this.props.articles, this.props.params.articleId)
        // use lodash (deep)isEqual
        return !_.isEqual(nextArticle, oldArticle)
    }

    componentDidMount() {
        const { showContentTable } = this.props
        if (!this.isInvalidUrl) {
            showContentTable()
        }
    }

    render() {
        let {
            urlPathname,
            tags, articles,
            addArticleLoveNumber, addArticleShareNumber, isFirstPage
        } = this.props

        const { articleId } = this.props.params

        let pathType = getPathType(urlPathname)
        let currentArticle = AppData.getAricleByArticleId(articles, articleId)

        if (currentArticle === undefined) {
            this.isInvalidUrl = true
            return (
                <InvalidUrlBox />
            )
        }

        let currentTag = AppData.getTagByTagName(tags, currentArticle.parentTagName)
        setPageTitle(currentArticle.title)

        return (
            <div className="article-box">
                <CurrentTagChain
                    tags={tags}
                    pathType={pathType}
                    currentTagId={currentTag._id} />
                <Article
                    isFirstPage={isFirstPage}
                    currentArticle={currentArticle}/>
                <ShareLoveBox
                    key={currentArticle._id}
                    currentArticle={currentArticle}
                    addArticleLoveNumber={addArticleLoveNumber}
                    addArticleShareNumber={addArticleShareNumber} />
                <NearArticleBox
                    nearArticle={currentArticle.nearArticle} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tags: state.data.get('tags').toJS(),
        articles: state.data.get('articles').toJS(),

        urlPathname: state.routing.location.pathname,
        isFirstPage: isFirstPage(state.routing.location.action)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showContentTable: bindActionCreators(showContentTableAction, dispatch),
        addArticleLoveNumber: bindActionCreators(addArticleLoveNumberAction, dispatch),
        addArticleShareNumber: bindActionCreators(addArticleShareNumberAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleBox)
