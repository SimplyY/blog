import React, {Component} from 'react'

import { Link } from 'react-router'
import { scrollToTop } from '../../util/common'
import { ARTICLE_PATH } from '../../consts/config'

class NearArticleBox extends Component {
    constructor() {
        super()
    }
    render() {
        const { nearArticle } = this.props
        let beforeArticleDOM, afterArticleDOM
        if (nearArticle === undefined) {
            return (
                <div className="near-article-box">
                </div>
            )
        }

        if (nearArticle.before !== null) {
            beforeArticleDOM = (
                <div className="before-article arrow-icon-left">
                    <Link to={'/' + ARTICLE_PATH + nearArticle.before._id}
                        onClick={scrollToTop}>
                        {nearArticle.before.title}
                    </Link>
                </div>
            )
        }
        if (nearArticle.after !== null) {
            afterArticleDOM = (
                <div className="after-article arrow-icon-right">
                    <Link to={'/' + ARTICLE_PATH + nearArticle.after._id}
                        onClick={scrollToTop}>
                        {nearArticle.after.title}
                    </Link>
                </div>
            )
        }

        return (
            <div className="near-article-box">
                {beforeArticleDOM}
                {afterArticleDOM}
            </div>
        )
    }
}

export default NearArticleBox
