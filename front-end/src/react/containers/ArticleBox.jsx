import React, {Component} from 'react'
import {connect} from 'react-redux'

import { AppData } from '../../util/AppData'

import Article from '../components/Article'
import CurrentTagChain from '../components/CurrentTagChain'

class ArticleBox extends Component {
    constructor() {
        super()
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
