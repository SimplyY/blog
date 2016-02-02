import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

class ArticleList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                articleList
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tagName: state.tagName
    }
}

export default connect()(ArticleList)
