import React, {Component} from 'react'

class ContentTable extends Component {
    constructor() {
        super()
        this.state = {
            isShow: false,
            contentTable: undefined
        }
    }

    render() {
        return (
            <button onClick={this.toggleContentTable.bind(this)}>
                a
            </button>
        )
    }

    toggleContentTable() {
        let { contentDOMId } = this.props

        // 第一次需从 dom 里加载出 contentTable
        if (this.state.contentTable === undefined) {
            let contentTable = getContentTableFromDOM(document.getElementById(contentDOMId))
            this.setState({contentTable})
        }

        if (this.state.isShow === false) {
            showContentTable()
            this.setState({isShow: true})
        } else {
            hiddenContentTable()
            this.setState({isShow: false})
        }
    }
}

function showContentTable() {

}

function hiddenContentTable() {

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
}

export default ContentTable
