import React, {Component} from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { enterNewRouter } from '../../util/common'

import { TAG_PATH } from '../../consts/config'
import * as img from '../../consts/img'
import * as text from '../../consts/text'

class InfoSideBar extends Component{
    constructor({ dispatch }) {
        super()
        this.dispatch = dispatch
    }

    render() {
        let { tags } = this.props
        let columnTagsDOM = getColumnTagsDOM(tags, this.dispatch, push)

        return (
            <div className="main-sidebar">
                <div className="personal-info">
                    <div className="avator-info">
                        <img className="avator" src={img.MY_AVATOR_URL} alt="" />
                        <div className="avator-name">
                            {text.MY_NAME}
                        </div>
                    </div>
                    <div className="other-info">
                        <div>
                            <div className="github-info">
                                <div className="github-icon iconfont"
                                    dangerouslySetInnerHTML={{__html: img.GITHUB_ICONFONT}}></div>
                                <a target="_blank" href={text.MY_GITHUB_URL}>{text.MY_NAME}</a>
                            </div>
                            <div className="weibo-info">
                                <div className="weibo-icon iconfont"
                                    dangerouslySetInnerHTML={{__html: img.WEIBO_ICONFONT}}></div>
                                <a target="_blank" href={text.MY_WEIBO_URL}>{text.MY_WEIBO_NAME}</a>
                            </div>
                        </div>
                        <div>
                            <div className="zhihu-info">
                                <div className="zhihu-icon iconfont"
                                    dangerouslySetInnerHTML={{__html: img.ZHIHU_ICONFONT}}></div>
                                <a target="_blank" href={text.MY_ZHIHU_URL}>{text.MY_NAME}</a>
                            </div>
                            <div className="email-info">
                                <div className="email-icon iconfont"
                                    dangerouslySetInnerHTML={{__html: img.EMAIL_ICONFONT}}></div>
                                <a href={`mailto:` + text.MY_EMAIL} >{text.MY_EMAIL}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column-tags">
                    <div className="column-header">
                        {text.COLUMN_INTRO_TEXT}
                    </div>
                    <ol className="column-list">
                        {columnTagsDOM}
                    </ol>
                </div>
            </div>
        )
    }
}

function getColumnTagsDOM(tags, dispatch, push) {
    let columnTags = tags.filter(item => item.tagRank === 3)
    return columnTags.map(item => {
        return (
            <li className="column-item" key={item._id} onClick={() => {
                enterNewRouter('/' + TAG_PATH + item._id, dispatch, push)
            }}>
                {item.tagName}
            </li>
        )
    })
}
export default connect()(InfoSideBar)
