import React, {Component} from 'react'

import _ from '../../../lib/lodash.core'

import { AppData } from '../../util/AppData'
import { jumpToAnchor, showAnchor, isUrlInAnchor, sanitizeHTML } from '../../util/common'

import * as text from '../../consts/text'

class Article extends Component {
    constructor() {
        super()
    }

    shouldComponentUpdate(nextProps){
        let nextArticle = nextProps.currentArticle
        let oldArticle = this.props.currentArticle
        // use lodash (deep)isEqual
        return !_.isEqual(nextArticle.html, oldArticle.html)
    }

    componentDidMount() {
        if (isUrlInAnchor()) {
            showAnchor()
        }
    }

    render() {
        // console.log('Article render')
        let { currentArticle } = this.props
        let currentArticleDOM = currentArticle.html

        let dateStr = AppData.formatArticleDate(currentArticle.date)

        return (
            <div className="article">
                <div className="article-info">
                    <div className="author-info-wrapper">
                        <label>{text.AUTHOR}</label>
                        <p>{text.MY_NAME}</p>
                    </div>
                    <div className="date-info-wrapper">
                        <label>{text.ARTICLE_DATE_LABEL_TEXT}</label>
                        <date>{dateStr}</date>
                    </div>
                    <div>
                        <a className="print-this-page" href="javascript:window.print()">click there to get pdf or print</a>
                    </div>
                </div>

                <article id="article-content" className="markdown-body"
                    dangerouslySetInnerHTML={{__html: sanitizeHTML(currentArticleDOM)}}
                    onClick={(e) => {
                        if (e.target.className === 'iconfont article-anchor') {
                            jumpToAnchor(e)
                        }
                }} >
                </article>
            </div>
        )
    }
}



export default Article
