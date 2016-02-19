import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { AppData } from '../../util/AppData'
import { enterNewRouter } from '../../util/common'

import { ARTICLE_PATH, SHOW_MORE_ARTICLES_NUMBER } from '../../consts/config'
import * as img from '../../consts/img'
import * as text from '../../consts/text'

class ArticleList extends Component {
    constructor({ dispatch }) {
        super()
        // react-router-redux's dispatch
        this.dispatch = dispatch
    }

    render() {
        let { showedArticles, showMoreArticle, showedArticlesMaxNumber } = this.props

        let clickMoreDOM = getClickMoreDOM(showedArticles, showedArticlesMaxNumber, showMoreArticle)

        // limit showed articles number by state.showedArticlesMaxNumber
        let factShowedArticles = showedArticles.slice(0, showedArticlesMaxNumber)
        let articlesListDOM = getArticlesListDOM(this.dispatch, factShowedArticles)

        return (
            <div>
                {articlesListDOM}
                {clickMoreDOM}
            </div>
        )
    }
}

function getClickMoreDOM(showedArticles, showedArticlesMaxNumber, showMoreArticle) {
    let clickMoreDOM
    if (showedArticles.length > showedArticlesMaxNumber) {
        clickMoreDOM = (
            <div className="click-more" onClick={() => showMoreArticle(SHOW_MORE_ARTICLES_NUMBER)} >
                <p>More</p>
            </div>
        )
    }
    return clickMoreDOM
}

function getArticlesListDOM(dispatch, factShowedArticles) {
    return factShowedArticles.map(item => {
        let loveNumber = Math.ceil(item.loveNumber)
        let shareNumber = Math.ceil(item.shareNumber)
        let dateStr = AppData.formatArticleDate(item.date)

        return (
            <div className="article-list-item" key={item._id} onClick={() => {
                enterNewRouter('/' + ARTICLE_PATH + item._id, dispatch, push)
            }} >
                <div className="title">{item.title}</div>
                <div className="love-share-info">
                    <div className="articlelist-love-box">
                        <div className="iconfont article-list-love"
                             dangerouslySetInnerHTML={{__html: img.LOVE_ICONFONT}}></div>
                        <div>{loveNumber}</div>
                    </div>
                    <div className="articlelist-share-box">
                        <div className="iconfont article-list-share"
                            dangerouslySetInnerHTML={{__html: img.SHARE_ICONFONT}}></div>
                        <div>{shareNumber}</div>
                    </div>
                </div>
                <div className="articlelist-date">
                    <label>{text.ARTICLE_DATE_LABEL_TEXT}</label>
                    <div>{dateStr}</div>
                </div>
            </div>
        )
    })
}

export default connect()(ArticleList)
