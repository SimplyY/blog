import React, {Component} from 'react'

import * as img from '../../consts/img'

class ShareLoveBox extends Component {
    constructor() {
        super()
        this.state = {
            isLove: false,
            isShare: false,
        }
    }

    render() {
        let { currentArticle } = this.props

        return (
            <div className="love-share-box">
                <div className="love-and-share">
                    <div className='article-love-box' onClick={this.toggleLove.bind(this)}>
                        <div className="iconfont article-love"
                            dangerouslySetInnerHTML={{__html: img.LOVE_ICONFONT}}></div>
                        <p>{'喜欢 ( ' + currentArticle.loveNumber + ' )'}</p>
                    </div>
                    <div className="article-share-box" onClick={this.toggleShare.bind(this)}>
                        <div className="iconfont article-share"
                            dangerouslySetInnerHTML={{__html: img.SHARE_ICONFONT}}></div>
                        <p>{'分享 ( ' + currentArticle.shareNumber + ' )'}</p>
                    </div>
                </div>
            </div>
        )
    }

    toggleLove() {
        let { currentArticle, addArticleLoveNumber } = this.props
        let _id = currentArticle._id

        if (this.state.isLove === false) {
            addArticleLoveNumber(_id, 1)
            this.setState({isLove: true})
        }
    }

    toggleShare() {
        let { currentArticle, addArticleShareNumber } = this.props
        let _id = currentArticle._id

        if (this.state.isShare === false) {
            addArticleShareNumber(_id, 1)
            this.setState({isShare: true})
            shareInfo2clipboard(currentArticle)
        }
    }
}

function shareInfo2clipboard(currentArticle) {
    var articleName = currentArticle.title
    var articleUrl = window.location.href

    var shareInfo = 'SimplyY 的博客文章: ' + '《' +  articleName  + '》' + '\t链接为： ' + articleUrl;

    window.prompt('你正在分享这篇博文\n将分享信息复制到剪贴板: Ctrl+C, Enter（回车）\n然后发到任何你想发的地方吧', shareInfo);
}

export default ShareLoveBox
