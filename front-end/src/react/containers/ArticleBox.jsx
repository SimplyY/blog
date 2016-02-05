import React, {Component} from 'react'
import {connect} from 'react-redux'

import { AppData } from '../../util/AppData'

import Article from '../components/Article'

class ArticleBox extends Component {
    constructor() {
        super()
    }
    render() {
        let { articles } = this.props
        const { articleId } = this.props.params
        let currentArticle = AppData.getAricleByArticleId(articles, articleId)

        return (
            <div>
                <Article currentArticle={currentArticle} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        articles: state.data.get('articles').toJS(),
    }
}

export default connect(mapStateToProps)(ArticleBox)
