import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { ARTICLE_PATH, SHOW_MORE_ARTICLES_NUMBER } from '../../consts/config'

class ArticleList extends Component {
    constructor({ dispatch }) {
        super()
        this.dispatch = dispatch
    }

    render() {
        let { showedArticles, showMoreAriticle, showedArticlesMaxNumber } = this.props

        let clickMoreDOM
        if (showedArticles.length > showedArticlesMaxNumber) {
            clickMoreDOM = (
                <div onClick={() => showMoreAriticle(SHOW_MORE_ARTICLES_NUMBER)} >
                    click more
                </div>
            )
        }

        showedArticles = showedArticles.slice(0, showedArticlesMaxNumber)
        let articlesDOM = showedArticles.map((item) => {
            return (
                <div key={item._id} onClick={() => {
                        this.dispatch(push('/' + ARTICLE_PATH + item._id))
                    }} >
                    {item.title}
                </div>
            )
        })

        return (
            <div>
                {articlesDOM}
                {clickMoreDOM}
            </div>
        )
    }
}

export default connect()(ArticleList)
