import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Tag from './Tag'
import { scrollToTop } from '../../util/common'

import * as config from '../../consts/config'
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
            <nav className="main-nav-bar">
                <Link className="home" to="/" onClick={scrollToTop}>
                    {text.MY_NAME}
                </Link>
                <ol className="first-menus">
                    {tagsDOM}
                    {otherTagsDOM}
                </ol>
            </nav>
        )
    }
}

function buildOtherTagsDOM() {
    let otherTags = [
        {
            url: '/' + config.HOT_PATH,
            tagName: text.HOT_TEXT,
            _id: text.HOT_TEXT
        },
        {
            url: '/' + config.TOOLS_PATH,
            tagName: text.TOOLS_TEXT,
            _id: text.TOOLS_TEXT,
            childrenTags: [
                {
                    url: '/' + config.MD2PDF_TOOL_PATH,
                    tagName: text.MD2PDF_TOOL_TEXT,
                    _id: text.MD2PDF_TOOL_TEXT
                }
            ]
        },
        {
            url: '/' +  config.ARTICLE_PATH + config.ABOUT_ARTICLE_ID,
            tagName: text.ABOUT_TEXT,
            _id: text.ABOUT_TEXT
        }
    ]

    return otherTags.map(item => {
        if (item.childrenTags === undefined) {
            return (
                <Tag key={item._id} url={item.url} text={item.tagName}/>
            )
        }
        else {
            let childrenTagsDOM = getChildrenTagsDOM(item.childrenTags)
            let secondMenus = getSecondMenus(childrenTagsDOM)
            return (
                <Tag key={item._id}
                    url={item.url}
                    text={item.tagName}
                    child={secondMenus} />
            )
        }
    })
}


function buildTagsDOMBytTags(tags) {
    let tagsDOM = []

    tags.forEach(item => {
        item.url = '/' + config.TAG_PATH + item._id
    })
    tags.forEach(item => {
        if (item.tagRank === 1) {

            // 构造二级 tag DOM
            let childrenTagsDOM = getChildrenTagsDOM(item.childrenTags)
            let secondMenus = getSecondMenus(childrenTagsDOM)

            // 构造一级 tag DOM
            tagsDOM.push(
                <Tag key={item._id}
                    url={item.url}
                    text={item.tagName}
                    child={secondMenus} />
            )
        }
    })

    return tagsDOM
}

function getSecondMenus(childrenTagsDOM) {
    return (
        <ol className="second-menus">
            {childrenTagsDOM}
        </ol>
    )
}

function getChildrenTagsDOM(childrenTags) {
    if (childrenTags !== undefined) {
        let childrenTagsDOM = childrenTags.map(item => {
            return (
                <Tag key={item._id} url={item.url} text={item.tagName}/>
            )
        })

        return childrenTagsDOM
    }
}

export default connect()(NavigationBar)
