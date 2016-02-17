import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {TAG_PATH} from '../../consts/config'
import * as text from '../../consts/text'

class NavigationBar extends Component{
    constructor({ dispatch }) {
        super()
        this.dispatch = dispatch
    }

    render() {
        let { tags } = this.props
        let tagsDOM = buildTagsDOMBytTags(tags, this)

        return (
            <div className="main-nav-bar">
                <p className="home" onClick={() => {
                        window.scrollTo(0, 0)
                        this.dispatch(push('/'))
                    }}>
                    {text.AUTHOR_NAME}
                </p>
                <ol className="first-menus">
                    {tagsDOM}
                </ol>
            </div>
        )
    }
}

function buildTagsDOMBytTags(tags, that) {
    let tagsDOM = []
    tags.forEach((item) => {
        if (item.tagRank === 1) {
            // 构造二级 tag DOM
            let childrenTagsDOM
            if (item.childrenTags !== undefined) {
                childrenTagsDOM = item.childrenTags.map(item => {
                    return (
                        <li key={item._id} onClick={(e) => {
                            window.scrollTo(0, 0)
                            that.dispatch(push('/' + TAG_PATH + item._id))
                            e.stopPropagation()
                        }} >
                            {item.tagName}
                        </li>
                    )
                })
            }
            // 构造一级 tag DOM
            tagsDOM.push(
                <li key={item._id} onClick={() => {
                        window.scrollTo(0, 0)
                        that.dispatch(push('/' + TAG_PATH + item._id))
                    }} >
                    {item.tagName}
                    <ol className="second-menus">
                        {childrenTagsDOM}
                    </ol>
                </li>
            )
        }
    })

    return tagsDOM
}

export default connect()(NavigationBar)
