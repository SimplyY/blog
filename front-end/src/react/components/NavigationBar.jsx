import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { scrollToTop } from '../../util/common'

import {TAG_PATH, HOT_PATH, ARTICLE_PATH, ABOUT_ARTICLE_ID} from '../../consts/config'
import * as text from '../../consts/text'

class NavigationBar extends Component{
    constructor() {
        super()
    }

    render() {
        let { tags } = this.props
        let tagsDOM = buildTagsDOMBytTags(tags)
        let otherTagsDOM = buildOtherTagsDOM()

        return (
            <div className="main-nav-bar">
                <Link className="home" to="/" onClick={scrollToTop}>
                    {text.MY_NAME}
                </Link>
                <ol className="first-menus">
                    {tagsDOM}
                    {otherTagsDOM}
                </ol>
            </div>
        )
    }
}

function buildOtherTagsDOM() {
    let otherTags = [
        {
            toUrl: '/' + HOT_PATH,
            text: text.HOT_TEXT
        },
        {
            toUrl: '/' +  ARTICLE_PATH + ABOUT_ARTICLE_ID,
            text: text.ABOUT_TEXT
        }
    ]

    return otherTags.map(item => (
        <li>
            <Link className="nav-tag-content" to={item.toUrl} onClick={scrollToTop}>
                {item.text}
            </Link>
        </li>
    ))
}

function buildTagsDOMBytTags(tags) {
    let tagsDOM = []
    tags.forEach((item) => {
        if (item.tagRank === 1) {
            // 构造二级 tag DOM
            let childrenTagsDOM
            if (item.childrenTags !== undefined) {
                childrenTagsDOM = item.childrenTags.map(item => {
                    return (
                        <li key={item._id}>
                            <Link className="nav-tag-content" to={'/' + TAG_PATH + item._id}  onClick={e => {
                                scrollToTop()
                            }} >
                                {item.tagName}
                            </Link>
                        </li>
                    )
                })
            }
            // 构造一级 tag DOM
            tagsDOM.push(
                <li key={item._id}>
                    <Link className="nav-tag-content" to={'/' + TAG_PATH + item._id} onClick={scrollToTop}>
                        {item.tagName}
                    </Link>
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
