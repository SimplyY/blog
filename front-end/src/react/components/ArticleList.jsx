import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { ARTICLE_PATH, SHOW_ARTICLE_NUMBER } from '../../consts/config'

class ArticleList extends Component {
    constructor({ dispatch }) {
        super()
        this.dispatch = dispatch
    }

    render() {
        const { showArticles } = this.props

        let articlesDOM = showArticles.map((item) => {
            return (
                <div key={item._id} onClick={() => {
                        this.dispatch(push('/' + ARTICLE_PATH + item._id))
                    }} >
                    {item.title}
                </div>
            )
        })

        let clickMoreDOM
        if (showArticles.length > SHOW_ARTICLE_NUMBER) {
            clickMoreDOM = (
                <div>click more</div>
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

export default connect()(ArticleList)
