import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {TAG_PATH} from '../../consts/config'

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
                let childrenTagDoms = item.childrenTags.map(item => {
                    return (
                        <li key={item._id} onClick={(e) => {
                                this.dispatch(push('/' + TAG_PATH + item._id))
                                e.stopPropagation()
                            }} >
                            {item.tagName}
                        </li>
                    )
                })

                doms.push(
                    <li key={item._id} onClick={() => {
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
                    SimplyY
                </p>
                <ol className="first-menus">
                    {doms}
                </ol>
            </div>
        )
    }
}

export default connect()(NavigationBar)
