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

        let doms = []
        tags.forEach((item) => {
            if (item.tagRank === 1) {
                let childrenTagDoms
                if (item.childrenTags !== undefined) {
                    childrenTagDoms = item.childrenTags.map(item => {
                        return (
                            <li key={item._id} onClick={(e) => {
                                    window.scrollTo(0, 0)
                                    this.dispatch(push('/' + TAG_PATH + item._id))
                                    e.stopPropagation()
                                }} >
                                {item.tagName}
                            </li>
                        )
                    })
                }

                doms.push(
                    <li key={item._id} onClick={() => {
                            window.scrollTo(0, 0)
                            this.dispatch(push('/' + TAG_PATH + item._id))
                        }} >
                        {item.tagName}
                        <ol className="second-menus">
                            {childrenTagDoms}
                        </ol>
                    </li>
                )
            }
        })

        return (
            <div className="main-nav-bar">
                <p className="home" onClick={() => {
                        this.dispatch(push('/'))
                    }}>
                    {text.AUTHOR_NAME}
                </p>
                <ol className="first-menus">
                    {doms}
                </ol>
            </div>
        )
    }
}

export default connect()(NavigationBar)
