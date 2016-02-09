import React, {Component} from 'react'

class VoteShareLoveBox extends Component {
    constructor() {
        super()
        this.isLove = false
        this.isShare = false
    }
    render() {
        let {
            currentArticle,
            addAriticleLoveNumber, addAriticleShareNumber, changeArticleGrade
        } = this.props

        let _id = currentArticle._id

        return (
            <div>
                <div className='article-vote-difficult-level' onClick={() => {
                        changeArticleGrade(_id, 1)
                    }}>
                </div>
                <div className='article-love-box' onClick={() => {
                        if (this.isLove === false) {
                            addAriticleLoveNumber(_id, 1)
                            this.isLove = true
                        }
                    }}>
                    <i className="iconfont article-list-love">&#xe612;</i>
                    <div>{currentArticle.loveNumber}</div>
                </div>
                <div className='article-share-box' onClick={() => {
                        if (this.isShare === false) {
                            addAriticleShareNumber(_id, 1)
                            this.isShare = true
                        }
                    }}>
                    <i className="iconfont article-list-share">&#xe60c;</i>
                    <div>{currentArticle.shareNumber}</div>
                </div>
            </div>
        )
    }
}

export default VoteShareLoveBox
