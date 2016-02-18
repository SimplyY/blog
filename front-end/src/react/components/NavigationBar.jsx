import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { enterNewRouter } from '../../util/common'

import {TAG_PATH, HOT_PATH} from '../../consts/config'
import * as text from '../../consts/text'

class NavigationBar extends Component{
    constructor({ dispatch }) {
        super()
        this.dispatch = dispatch
    }

    render() {
        let { tags } = this.props
        let tagsDOM = buildTagsDOMBytTags(tags, this.dispatch)

        return (
            <div className="main-nav-bar">
                <p className="home" onClick={() => {
                    enterNewRouter('/', this.dispatch, push)
                }}>
                    {text.MY_NAME}
                </p>
                <ol className="first-menus">

                    {tagsDOM}

                    <li onClick={() => {
                        enterNewRouter('/' + HOT_PATH, this.dispatch, push)
                    }}>
                        {text.HOT_TEXT}
                    </li>
                </ol>
            </div>
        )
    }
}

function buildTagsDOMBytTags(tags, dispatch) {
    let tagsDOM = []
    tags.forEach((item) => {
        if (item.tagRank === 1) {
            // 构造二级 tag DOM
            let childrenTagsDOM
            if (item.childrenTags !== undefined) {
                childrenTagsDOM = item.childrenTags.map(item => {
                    return (
                        <li key={item._id} onClick={e => {
                            enterNewRouter('/' + TAG_PATH + item._id, dispatch, push)
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
                        enterNewRouter('/' + TAG_PATH + item._id, dispatch, push)
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
