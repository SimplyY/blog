import React, {Component} from 'react'

import classNames from 'classnames'
import _ from '../../../lib/lodash.core'

import { jumpToAnchor } from '../../util/common'

import { ARROW_ICONFONT } from '../../consts/img'

class ContentTable extends Component {
    constructor() {
        super()
    }

    shouldComponentUpdate(nextProps){
        return !_.isEqual(nextProps.contentTable, this.props.contentTable)
    }

    render() {
        let { contentTable, isAppear } = this.props

        let contentTableDOM = this.getContentTableDOM(contentTable.content)

        let buttonClass = classNames({
            'content-table-button-disapper': !isAppear,
            'content-table-button': true,
            'content-table-button-clicked': contentTable.isShow
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
                    onClick={this.toggleContentTableState.bind(this)}>
                    <div className={buttonIconfontClass} dangerouslySetInnerHTML={{__html: ARROW_ICONFONT}}>
                    </div>
                </div>
                <section className={sidebarClass}>
                    <header className="content-table-header">
                        Table of Contents
                    </header>
                    {contentTableDOM}
                </section>
            </div>
        )
    }

    toggleContentTableState() {
        const { showContentTable, hiddenContentTable, contentTable } = this.props
        if (contentTable.isShow === false) {
            showContentTable()
        } else {
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



export default ContentTable
