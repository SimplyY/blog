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
                doms.push(
                    <li key={item._id} onClick={() => {
                            this.dispatch(push('/' + TAG_PATH + item._id))
                        }} >
                        {item.tagName}
                    </li>
                )
            }
        })

        return (
            <div>
                <ul>
                    {doms}
                </ul>
            </div>
        )
    }
}
export default connect()(NavigationBar)
