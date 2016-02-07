import React, {Component} from 'react'

import * as imgUrl from '../../consts/imgUrl'

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
                <div className='article-love-number' onClick={() => {
                        if (this.isLove === false) {
                            addAriticleLoveNumber(_id, 1)
                            this.isLove = true
                        }
                    }}>
                    <img src={imgUrl.LOVE_ICON_URL} alt="love" />
                    <div>{currentArticle.loveNumber}</div>
                </div>
                <div className='article-share-number' onClick={() => {
                        if (this.isShare === false) {
                            addAriticleShareNumber(_id, 1)
                            this.isShare = true
                        }
                    }}>
                    <img src={imgUrl.SHARE_ICON_URL} alt="share" />
                    <div>{currentArticle.shareNumber}</div>
                </div>
            </div>
        )
    }
}

export default VoteShareLoveBox
