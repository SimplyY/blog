import React, {Component} from 'react'

class ContentTable extends Component {
    constructor() {
        super()
        this.state = {
            isShow: false
        }
    }

    render() {
        let { contentDOMId } = this.props

        return (
            <button onClick={() => {
                    if (this.state.isShow === false) {
                        showContentTable(contentDOMId)
                        this.setState({isShow: true})
                    } else {
                        hiddenContentTable()
                        this.setState({isShow: false})
                    }
                }}>
                a
            </button>
        )
    }
}

function showContentTable(contentDOMId) {
    setTimeout(function() {
        getContentTableFromDOM(document.getElementById(contentDOMId))
    }, 100)
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
