import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { AppData } from '../../util/AppData'

import { TAG_PATH } from '../../consts/config'
import { ALL_ARTICLES_STR } from '../../consts/text'

class CurrentTagChain extends Component {
    constructor() {
        super()
    }
    render() {
        let { tags, currentTagId } = this.props
        let tag = AppData.getTagById(tags, currentTagId)

        let tagChainDOM
        // 如果是没有 currentTag 的页面，就是所有文章页面
        if (tag === undefined) {
            tagChainDOM = (
                <li>
                    <Link to="/">{ALL_ARTICLES_STR}</Link>
                </li>
            )
        }
        if (tag !== undefined){
            let tagChain = tag.parentsTagNameArray
            tagChain = tagChain.map((item) => AppData.getTagByTagName(tags, item))
            tagChain.push(tag)
            tagChainDOM = tagChain.map(item => {
                return (
                    <li key={item._id} >
                        <Link to={'/' + TAG_PATH + item._id}>{item.tagName}</Link>
                    </li>
                )
            })
        }

        return (
            <div className="tag-chain">
                <ol>
                    {tagChainDOM}
                </ol>
            </div>
        )
    }
}

export default connect()(CurrentTagChain)
