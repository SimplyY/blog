import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { AppData } from '../../util/AppData'

import { ARTICLE_PATH, SHOW_MORE_ARTICLES_NUMBER } from '../../consts/config'
import * as text from '../../consts/text'

class ArticleList extends Component {
    constructor({ dispatch }) {
        super()
        // react-router-redux's dispatch
        this.routerDispatch = dispatch
    }

    render() {
        let { showedArticles, showMoreArticle, showedArticlesMaxNumber } = this.props

        let clickMoreDOM = getClickMoreDOM(showedArticles, showedArticlesMaxNumber, showMoreArticle)

        // limit showed articles number by state.showedArticlesMaxNumber
        let factShowedArticles = showedArticles.slice(0, showedArticlesMaxNumber)
        let articlesListDOM = getArticlesListDOM(this.routerDispatch, factShowedArticles)

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
            <div onClick={() => showMoreArticle(SHOW_MORE_ARTICLES_NUMBER)} >
                click more
            </div>
        )
    }
    return clickMoreDOM
}

function getArticlesListDOM(routerDispatch, factShowedArticles) {
    return factShowedArticles.map(item => {
        let loveNumber = Math.ceil(item.loveNumber)
        let shareNumber = Math.ceil(item.shareNumber)
        let dateStr = AppData.formatArticleDate(item.date)

        return (
            <div className="article-list-item" key={item._id} onClick={() => {
                window.scrollTo(0, 0)
                routerDispatch(push('/' + ARTICLE_PATH + item._id))
            }} >
                <div className="title">{item.title}</div>
                <div className="love-share-info">
                    <div className="articlelist-love-box">
                        <i className="iconfont article-list-love">&#xe612;</i>
                        <div>{loveNumber}</div>
                    </div>
                    <div className="articlelist-share-box">
                        <i className="iconfont article-list-share">&#xe60c;</i>
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
