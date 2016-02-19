import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import _ from '../../../lib/lodash.core'

import { AppData } from '../../util/AppData'

import * as action from '../actions/articles'

import InvalidUrlBox from '../containers/InvalidUrlBox'

import Article from '../components/Article'
import CurrentTagChain from '../components/CurrentTagChain'
import ShareLoveBox from '../components/ShareLoveBox'

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

    render() {
        let {
            urlPathname,
            tags, articles,
            addArticleLoveNumber, addArticleShareNumber
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
                <Article currentArticle={currentArticle} />
                <ShareLoveBox currentArticle={currentArticle}
                    addArticleLoveNumber={addArticleLoveNumber}
                    addArticleShareNumber={addArticleShareNumber} />
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
        addArticleLoveNumber: bindActionCreators(action.addArticleLoveNumberAction, dispatch),
        addArticleShareNumber: bindActionCreators(action.addArticleShareNumberAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleBox)
