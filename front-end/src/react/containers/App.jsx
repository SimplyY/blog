import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {push} from 'react-router-redux'

import NavigationBar from '../components/NavigationBar'
import InfoBox from '../components/InfoBox'
import { appData } from '../../data'

class App extends Component {
    constructor() {
        super()
    }
    render() {
        const { children } = this.props
        let tags = appData.tags
        return (
            <div>
                <NavigationBar tags={tags} />
                <InfoBox />
                {children}
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {}
// }

export default connect()(App)
