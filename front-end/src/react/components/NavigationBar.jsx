import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Tag from './Tag'
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
            text: text.HOT_TEXT,
            key: text.HOT_TEXT
        },
        {
            toUrl: '/' +  ARTICLE_PATH + ABOUT_ARTICLE_ID,
            text: text.ABOUT_TEXT,
            key: text.ABOUT_TEXT
        }
    ]

    return otherTags.map(item => (
        <Tag key={item.key} url={item.toUrl} text={item.text}/>
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
                        <Tag key={item._id} url={'/' + TAG_PATH + item._id} text={item.tagName}/>
                    )
                })
            }

            let secondMenus = (
                <ol className="second-menus">
                    {childrenTagsDOM}
                </ol>
            )

            // 构造一级 tag DOM
            tagsDOM.push(
                <Tag key={item._id}
                    url={'/' + TAG_PATH + item._id}
                    text={item.tagName}
                    child={secondMenus} />
            )
        }
    })

    return tagsDOM
}

export default connect()(NavigationBar)
