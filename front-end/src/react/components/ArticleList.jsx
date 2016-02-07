import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { AppData } from '../../util/AppData'

import { ARTICLE_PATH, SHOW_MORE_ARTICLES_NUMBER } from '../../consts/config'
import * as text from '../../consts/text'
import * as imgUrl from '../../consts/imgUrl'

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

        // limit showed aritcles number by state.showedArticlesMaxNumber
        let factShowedArticles = showedArticles.slice(0, showedArticlesMaxNumber)

        let articlesDOM = factShowedArticles.map((item) => {
            let loveNumber = Math.ceil(item.loveNumber)
            let shareNumber = Math.ceil(item.shareNumber)
            let difficultLevel = AppData.getDifficultLevelByGrade(item.grade)
            let dateStr = AppData.formatArticleDate(item.date)

            return (
                <div key={item._id} onClick={() => {
                        window.scrollTo(0, 0)
                        this.dispatch(push('/' + ARTICLE_PATH + item._id))
                    }} >
                    <div>{item.title}</div>

                    <div className="articlelist-love-number">
                        <img src={imgUrl.LOVE_ICON_URL} alt="love" />
                        <div>{loveNumber}</div>
                    </div>
                    <div className="articlelist-share-number">
                        <img src={imgUrl.SHARE_ICON_URL} alt="share" />
                        <div>{shareNumber}</div>
                    </div>

                    <div className="articlelist-difficult-level">
                        <label>{text.ARTICLE_DIFFCULT_LEVEL_TEXT}</label>
                        <div>{difficultLevel}</div>
                    </div>

                    <div className="articlelist-date">
                        <label>{text.ARTICLE_DATE_LABEL_TEXT}</label>
                        <div>{dateStr}</div>
                    </div>
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
