import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

class Chart extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {children, inputValue} = this.props
        return (
            <div>
                chart
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect()(Chart)
