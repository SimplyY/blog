import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from '../../../lib/lodash.core'

import { AppData } from '../../util/AppData'

import Article from '../components/Article'
import CurrentTagChain from '../components/CurrentTagChain'

class ArticleBox extends Component {
    constructor() {
        super()
    }

    shouldComponentUpdate(nextProps){
        let nextArticle = AppData.getAricleByArticleId(nextProps.articles, nextProps.params.articleId)
        let oldArticle = AppData.getAricleByArticleId(this.props.articles, this.props.params.articleId)

        return !_.isEqual(nextArticle, oldArticle)
    }

    render() {
        let { tags, articles } = this.props
        const { articleId } = this.props.params

        let currentArticle = AppData.getAricleByArticleId(articles, articleId)
        let currentTag = AppData.getTagByTagName(tags, currentArticle.parentTagName)

        return (
            <div>
                <CurrentTagChain tags={tags} currentTagId={currentTag._id} />
                <Article currentArticle={currentArticle} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tags: state.data.get('tags').toJS(),
        articles: state.data.get('articles').toJS()
    }
}

export default connect(mapStateToProps)(ArticleBox)
