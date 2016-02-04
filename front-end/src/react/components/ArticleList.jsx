import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { ARTICLE_PATH, SHOW_ARTICLE_NUMBER } from '../../consts/config'

class ArticleList extends Component {
    constructor({ dispatch }) {
        super()
        this.dispatch = dispatch
    }

    getInitialState() {
        const { showArticles } = this.props

        return {
            showArticles
        };
    }

    render() {
        const { showArticles } = this.props

        let articlesDOM = showArticles.map((item) => {
            return (
                <div key={item._id} onClick={enterArticle(this.dispatch, item._id)} >
                    {item.title}
                </div>
            )
        })

        let clickMoreDOM
        if (showArticles.length > SHOW_ARTICLE_NUMBER) {
            clickMoreDOM = (
                <div onClick={loadMoreArticle} >click more</div>
            )
        }

        return (
            <div>
                {articlesDOM}
                {clickMoreDOM}
            </div>
        )
    }
}

function enterArticle(dispatch, articleId) {
    dispatch(push('/' + ARTICLE_PATH + articleId))
}

export default connect()(ArticleList)
