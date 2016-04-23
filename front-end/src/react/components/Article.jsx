import React, {Component} from 'react'

import _ from '../../../lib/lodash.core'

import { AppData } from '../../util/AppData'
import { jumpToAnchor, showAnchor, isUrlInAnchor, sanitizeHTML, isNodeEnv } from '../../util/common'

import * as text from '../../consts/text'

const FIRST_RENDER_MAX_LEN = 2000
const delay = 500

class Article extends Component {
    constructor() {
        super()
        this.state = {
            needSecondLoad: false
        }
    }

    shouldComponentUpdate(nextProps, nextStates){
        // 分批渲染长文章
        if (nextStates.needSecondLoad) {
            console.log('load second')
            return true
        }

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
        let currentArticleHtml = this.getShowHtml(currentArticle)
        console.log(currentArticleHtml.length)

        let dateStr = AppData.formatArticleDate(currentArticle.date)
        return (
            <article className="article">
                <div className="article-info">
                    <section className="author-info-wrapper">
                        <header className="header">{text.AUTHOR}</header>
                        <p className="info">{text.MY_NAME}</p>
                    </section>
                    <section className="date-info-wrapper">
                        <header className="header">{text.ARTICLE_DATE_LABEL_TEXT}</header>
                        <date className="info">{dateStr}</date>
                    </section>
                    <div className="article-print-tool">
                        <a className="print-this-page" href="javascript:window.print()">click there to get pdf or print</a>
                    </div>
                </div>

                <div id="article-content" className="markdown-body"
                    dangerouslySetInnerHTML={{__html: currentArticleHtml}}
                    onClick={(e) => {
                        if (e.target.className === 'iconfont article-anchor') {
                            jumpToAnchor(e)
                        }
                    }} >
                </div>
            </article>
        )
    }

    // 浏览器第一次加载如果文章很长，返回 minHtml
    // 浏览器第二次加载、服务器端渲染，直接返回完整 html
    getShowHtml(article) {
        const { isFirstPage } = this.props

        if (this.state.needSecondLoad || isFirstPage) {
            return article.html
        }

        // 浏览器第一次加载如果文章长度大于 FIRST_RENDER_MAX_LEN，返回 minHtml
        if (article.html.length < FIRST_RENDER_MAX_LEN) {
            return article.html
        } else {
            // 延迟加载完整 html
            setTimeout(() => {
                this.setState({needSecondLoad: true})
            }, delay)

            return article.minHtml
        }
    }
}


export default Article
