import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { children} = this.props
        return (
            <div>
                nav
                {children}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect()(App)
