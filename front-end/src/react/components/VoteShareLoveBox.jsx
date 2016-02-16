import React, {Component} from 'react'

class VoteShareLoveBox extends Component {
    constructor() {
        super()
        this.state = {
            isLove: false,
            isShare: false,
            isVote: false
        }
    }

    render() {
        let { currentArticle } = this.props

        return (
            <div>
                <div className='article-vote-difficult-level' onClick={this.toggleVote.bind(this)}>
                </div>

                <div className="love-and-share">
                    <div className='love-box' onClick={this.toggleLove.bind(this)}>

                        <i className="iconfont article-love">&#xe612;</i>
                        <p>{'喜欢 ( ' + currentArticle.loveNumber + ' )'}</p>
                    </div>
                    <div className="share-box" onClick={this.toggleShare.bind(this)}>

                        <i className="iconfont article-share">&#xe60c;</i>
                        <p>{'分享 ( ' + currentArticle.shareNumber + ' )'}</p>
                    </div>
                </div>
            </div>
        )
    }

    toggleVote() {
        let { currentArticle, changeArticleGrade } = this.props
        let _id = currentArticle._id

        if (this.state.isVote === false) {
            // TODO: changeArticleGrade
            changeArticleGrade(_id, 1)
            this.setState({isVote: true})
        }
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
    console.log(articleName)
    var articleName = currentArticle.title
    var articleUrl = window.location.href

    var shareInfo = 'SimplyY 的博客文章: ' + '《' +  articleName  + '》' + '\t链接为： ' + articleUrl;

    window.prompt('你正在分享这篇博文\n将分享信息复制到剪贴板: Ctrl+C, Enter（回车）\n然后发到任何你想发的地方吧', shareInfo);
}

export default VoteShareLoveBox
