import React, {Component} from 'react'

import { AppData } from '../../util/AppData'
import { md2html } from '../../util/md'
import { anchorHandler, showAnchor } from '../../util/common'

import * as text from '../../consts/text'

class Article extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        if (location.href.indexOf('#') !== -1 && location.href.split('#')[1]) {
            showAnchor()
        }
    }

    render() {

        let { currentArticle } = this.props
        let currentArticleDOM = md2html(currentArticle.md)

        let difficultLevel = AppData.getDifficultLevelByGrade(currentArticle.grade)
        let dateStr = AppData.formatArticleDate(currentArticle.date)

        return (
            <div className="article">
                <div className="article-info">
                    <div className="author-info-wrapper">
                        <label>{text.AUTHOR}</label>
                        <p>{text.AUTHOR_NAME}</p>
                    </div>
                    <div className="difficult-info-wrapper">
                        <label>{text.ARTICLE_DIFFCULT_LEVEL_TEXT}</label>
                        <p>{difficultLevel}</p>
                    </div>
                    <div className="date-info-wrapper">
                        <label>{text.ARTICLE_DATE_LABEL_TEXT}</label>
                        <date>{dateStr}</date>
                    </div>
                </div>

                <article className="markdown-body"
                    dangerouslySetInnerHTML={{__html: currentArticleDOM}}
                    onClick={(e) => {
                        anchorHandler(e)
                }} >
                </article>
            </div>

        )
    }
}

export default Article