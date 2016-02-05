import React, {Component} from 'react'
import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'
import InfoSideBar from '../components/InfoSideBar'

class App extends Component {
    constructor() {
        super()
    }
    render() {
        const { children, tags } = this.props

        return (
            <div>
                <NavigationBar tags={tags} />
                <InfoSideBar />
                {children}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tags: state.data.get('tags').toJS()
    }
}

export default connect(mapStateToProps)(App)
