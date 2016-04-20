import React, {Component} from 'react'

import * as img from '../../consts/img'
import * as text from '../../consts/text'


class PersonInfo extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="personal-info">
                <div className="avator-info">
                    <img className="avator" src={img.MY_AVATOR_URL} alt="" />
                    <div className="avator-name">
                        {text.MY_NAME}
                    </div>
                </div>
                <address className="other-info">
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
                </address>
            </div>
        )
    }
}

export default PersonInfo
