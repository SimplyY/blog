import React, {Component} from 'react'

class VoteShareLoveBox extends Component {
    constructor() {
        super()
        this.isLove = false
        this.isShare = false
        this.isVote === false
    }
    render() {
        let {
            currentArticle,
            addArticleLoveNumber, addArticleShareNumber, changeArticleGrade
        } = this.props

        let _id = currentArticle._id

        return (
            <div>
                <div className='article-vote-difficult-level' onClick={() => {
                        if (this.isVote === false) {
                            changeArticleGrade(_id, 1)
                            this.isVote = true
                        }
                    }}>
                </div>

                <div className="love-and-share">
                    <div className='love-box' onClick={() => {
                            if (this.isLove === false) {
                                addArticleLoveNumber(_id, 1)
                                this.isLove = true
                            }
                        }}>
                        <i className="iconfont article-love">&#xe612;</i>
                        <p>{'喜欢 ( ' + currentArticle.loveNumber + ' )'}</p>
                    </div>
                    <div className="share-box" onClick={() => {
                            if (this.isShare === false) {
                                addArticleShareNumber(_id, 1)
                                this.isShare = true

                                shareInfo2clipboard(currentArticle)
                            }
                        }}>
                        <i className="iconfont article-share">&#xe60c;</i>
                        <p>{'分享 ( ' + currentArticle.shareNumber + ' )'}</p>
                    </div>
                </div>
            </div>
        )
    }
}

function shareInfo2clipboard(currentArticle) {
    console.log(articleName)
    var articleName = currentArticle.title
    var articleUrl = window.location.href

    var shareInfo = 'SimplyY 的博客文章: ' + '《' +  articleName  + '》' + '\t链接为： ' + articleUrl;

    window.prompt('你正在分享这篇博文\n将分享信息复制到剪贴板: Ctrl+C, Enter（回车）\n然后发到任何你想发的地方吧', shareInfo);
}

export default VoteShareLoveBox
