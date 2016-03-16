import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import PersonInfo from './PersonInfo'

import { scrollToTop } from '../../util/common'

import { TAG_PATH } from '../../consts/config'
import * as text from '../../consts/text'

class InfoSideBar extends Component{
    constructor({ dispatch }) {
        super()
        this.dispatch = dispatch
    }

    render() {
        let { tags } = this.props
        let columnTagsDOM = getColumnTagsDOM(tags)

        return (
            <div className="main-sidebar">
                <PersonInfo />
                <div className="column-tags">
                    <div className="column-header">
                        {text.COLUMN_INTRO_TEXT}
                    </div>
                    <ol className="column-list">
                        {columnTagsDOM}
                    </ol>
                </div>
            </div>
        )
    }
}

function getColumnTagsDOM(tags) {
    let columnTags = tags.filter(item => item.tagRank === 3)
    return columnTags.map(item => {
        return (
            <li key={item._id}>
                <Link className="column-item reset-link" to={'/' + TAG_PATH + item.url} onClick={scrollToTop}>
                    {item.tagName}
                </Link>
            </li>
        )
    })
}
export default connect()(InfoSideBar)
