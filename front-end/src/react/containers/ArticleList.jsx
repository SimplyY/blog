import React, { Component } from 'react'
import { connect } from 'react-redux'
import { appData } from '../../data'

class ArticleList extends Component {
    constructor() {
        super()
    }
    render() {
        const { params } = this.props
        let tagId = params._id
        let articles = appData.getSortedAriclesByTagId(tagId)

        if (articles === undefined) {
            // TODO invalid url component
            return (
                <div>invalid url</div>
            )
        }

        let dom = articles.map((item) => {
            return <div key={item._id} >{item.title}</div>
        })

        return (
            <div>
                {dom}
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         tagName: state.tagName
//     }
// }

export default connect()(ArticleList)
