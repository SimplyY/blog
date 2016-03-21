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

import { getPathType } from '../../util/common'

class ArticleBox extends Component {
    constructor() {
        super()
    }

    shouldComponentUpdate(nextProps){
        let nextArticle = AppData.getAricleByArticleId(nextProps.articles, nextProps.params.articleId)
        let oldArticle = AppData.getAricleByArticleId(this.props.articles, this.props.params.articleId)
        // use lodash (deep)isEqual
        return !_.isEqual(nextArticle, oldArticle)
    }

    componentDidMount() {
        const { showContentTable } = this.props
        showContentTable()
    }

    render() {
        // console.log('ArticleBox render')

        let {
            urlPathname,
            tags, articles,
            addArticleLoveNumber, addArticleShareNumber, appearContentTable, disappearContentTable
        } = this.props

        const { articleId } = this.props.params

        let pathType = getPathType(urlPathname)
        let currentArticle = AppData.getAricleByArticleId(articles, articleId)
        let currentTag = AppData.getTagByTagName(tags, currentArticle.parentTagName)

        if (currentArticle === undefined) {
            return (
                <InvalidUrlBox />
            )
        }

        return (
            <div className="article-box">
                <CurrentTagChain pathType={pathType} tags={tags} currentTagId={currentTag._id} />
                <Article currentArticle={currentArticle}
                    appearContentTable={appearContentTable}
                    disappearContentTable={disappearContentTable}/>
                <ShareLoveBox currentArticle={currentArticle}
                    addArticleLoveNumber={addArticleLoveNumber}
                    addArticleShareNumber={addArticleShareNumber} />
                <NearArticleBox nearArticle={currentArticle.nearArticle} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tags: state.data.get('tags').toJS(),
        articles: state.data.get('articles').toJS(),

        urlPathname: state.routing.location.pathname
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
