import React, {Component} from 'react'

import classNames from 'classNames'

import { jumpToAnchor } from '../../util/common'

class ContentTable extends Component {
    constructor() {
        super()
        this.state = {
            isShow: false,
            contentTable: undefined
        }
    }

    render() {
        let contentTableDOM = this.getContentTableDOM(this.state.contentTable)
        let buttonClass = classNames({
            'content-table-button': true,
            'content-table-button-clicked': this.state.isShow
        })
        let sidebarClass = classNames({
            'content-table-sidebar': true,
            'content-table-sidebar-show': this.state.isShow
        })

        return (
            <div className="content-table">
                <div className={buttonClass} onClick={this.toggleContentTable.bind(this)}>
                    button
                </div>
                <div className={sidebarClass}>
                    {contentTableDOM}
                </div>
            </div>
        )
    }

    toggleContentTable() {
        let { contentDOMId } = this.props

        // 第一次需从 dom 里加载出 contentTable
        if (this.state.contentTable === undefined) {
            let contentTable = getContentTableFromDOM(document.getElementById(contentDOMId))
            this.setState({contentTable})
        }

        const wrapperMoveClass = ' wrapper-move'
        if (this.state.isShow === false) {
            showContentTable(wrapperMoveClass, this.props.wrapperId)
            this.setState({isShow: true})
        } else {
            hiddenContentTable(wrapperMoveClass, this.props.wrapperId)
            this.setState({isShow: false})
        }
    }

    getContentTableDOM(contentTable) {
        if (contentTable === undefined) {
            return
        }

        return contentTable.map(item => {
            return (
                <a className="content-table-item" key={item.content}
                    data-rank={item.rank} href={'#' + item.content}
                    onClick={jumpToAnchor}>
                    {item.content}
                </a>
            )
        })
    }
}

function showContentTable(wrapperMoveClass, wrapperId) {
    let wrapperDOM = document.getElementById(wrapperId)
    wrapperDOM.className += wrapperMoveClass
}

function hiddenContentTable(wrapperMoveClass, wrapperId) {
    let wrapperDOM = document.getElementById(wrapperId)
    wrapperDOM.className = wrapperDOM.className.replace(wrapperMoveClass, '' );
}

function getContentTableFromDOM(contentDOM) {
    let contentDOMArray = Array.prototype.slice.call(contentDOM.children)
    let contentTable = contentDOMArray.filter(item => {
        let tagNameArray = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
        return tagNameArray.indexOf(item.tagName) !== -1
    })
    // id tagName
    contentTable = contentTable.map(item => {
        let newItem = {
            content: item.id,
            // tagName is 'Hx', rank is x
            rank: Number.parseInt(item.tagName[1], 10),
        }
        return newItem
    })

    return contentTable
}

export default ContentTable
