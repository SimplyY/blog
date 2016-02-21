import React, {Component} from 'react'

import classNames from 'classNames'

import { jumpToAnchor } from '../../util/common'

import { wrapperMoveClass } from '../../consts/config'
import { ARROW_ICONFONT } from '../../consts/img'

class ContentTable extends Component {
    constructor() {
        super()
    }

    componentDidUpdate() {
        if (this.props.contentTable.appear === false) {
            wrapperReset(wrapperMoveClass, this.props.wrapperId)
        }
    }

    render() {
        let { contentTable } = this.props

        let contentTableDOM = this.getContentTableDOM(contentTable.content)

        let buttonClass = classNames({
            'content-table-button': true,
            'content-table-button-clicked': contentTable.isShow,
            'content-table-button-disapper': !contentTable.appear
        })
        let buttonIconfontClass = classNames({
            'button': true,
            'iconfont': true,
            'button-iconfont-clicked': contentTable.isShow
        })
        let sidebarClass = classNames({
            'content-table-sidebar': true,
            'content-table-sidebar-show': contentTable.isShow
        })

        return (
            <div className="content-table">
                <div className={buttonClass}
                    onClick={this.toggleContentTable.bind(this)}>
                    <div className={buttonIconfontClass} dangerouslySetInnerHTML={{__html: ARROW_ICONFONT}}>
                    </div>
                </div>
                <div className={sidebarClass}>
                    <div className="content-table-header">
                        Table of Contents
                    </div>
                    {contentTableDOM}
                </div>
            </div>
        )
    }

    toggleContentTable() {
        let {
            contentDOMId, contentTable,
            showContentTable, hiddenContentTable, loadContentTableContent
        } = this.props

        // 第一次需从 dom 里加载出 contentTable
        if (contentTable.content === undefined) {
            let contentTableContent = getContentTableContent(document.getElementById(contentDOMId))
            loadContentTableContent(contentTableContent)
        }

        if (contentTable.isShow === false) {
            wrapperMove(wrapperMoveClass, this.props.wrapperId)
            showContentTable()
        } else {
            wrapperReset(wrapperMoveClass, this.props.wrapperId)
            hiddenContentTable()
        }
    }

    getContentTableDOM(contentTable) {
        if (contentTable === undefined) {
            return
        }

        return contentTable.map(item => {
            return (
                <div className="content-table-item" key={item.content}
                    data-rank={item.rank} >
                    {getPrefixedContentDOM(item)}
                </div>
            )
        })

        function getPrefixedContentDOM(item) {
            if (item.prefix === undefined) {
                return
            }
            return (
                <li data-href={'#' + item.content} onClick={jumpToAnchor}>
                    {item.prefix + ' ' + item.content}
                </li>
            )
        }
    }
}

function wrapperMove(wrapperMoveClass, wrapperId) {
    let wrapperDOM = document.getElementById(wrapperId)
    wrapperDOM.className += wrapperMoveClass
}

function wrapperReset(wrapperMoveClass, wrapperId) {
    let wrapperDOM = document.getElementById(wrapperId)
    wrapperDOM.className = wrapperDOM.className.replace(wrapperMoveClass, '' );
}

function getContentTableContent(contentDOM) {
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
            rank: Number.parseInt(item.tagName[1], 10)
        }
        return newItem
    })

    // get item prefix
    getPrefix(contentTable)

    return contentTable
}

function getPrefix(contentTable) {
    // 遍历，给每一个 item 生成 prefix，使用 currentPrefix
    // currentPrefix 的构造:
    // 第一项为1.
    // 当 item.rank 大于前者，大了几，在末尾加上几个"1."，比如大1的话，1.变成1.1.
    // 当 item.rank 等于前者，将currentPrefix的倒数第二位“加1”，比如1.1.变成1.2.
    // 当 item.rank 小于前者，小了几，将currentPrefix的后两位去掉几次，再将currentPrefix的倒数第二位“加1”, 比如小1， 效果为1.2.变成2.

    let currentPrefix = '1.'
    contentTable.forEach((item, index, array) => {
        if (index === 0) {
            return
        }
        if (index === 1) {
            item.prefix = currentPrefix
            return
        }

        let diff = item.rank - array[index-1].rank
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                currentPrefix += '1.'
            }
        }
        if (diff === 0) {
            currentPrefix = secendLastCharAdd1(currentPrefix)
        }
        if (diff < 0) {
            for (let i = 0; i < -diff; i++) {
                currentPrefix = currentPrefix.slice(0, currentPrefix.length-2)
            }
            currentPrefix = secendLastCharAdd1(currentPrefix)
        }
        item.prefix = currentPrefix
    })

    function secendLastCharAdd1(str) {
        let numberStr = str.charAt(str.length-2)
        let newNumberStr = (Number(numberStr) + 1).toString()
        return str.slice(0, str.length-2) + newNumberStr + str.charAt(str.length-1)
    }
}

export default ContentTable
