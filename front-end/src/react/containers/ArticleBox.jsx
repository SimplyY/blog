import React, {Component} from 'react'
import {connect} from 'react-redux'

class ArticleBox extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                article
            </div>
        )
    }
}


export default connect()(ArticleBox)
