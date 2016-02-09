import React, {Component} from 'react'
import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'
import InfoSideBar from '../components/InfoSideBar'
import Footer from '../components/Footer'

class App extends Component {
    constructor() {
        super()
    }
    render() {
        const { children, tags } = this.props

        return (
            <div className="main-wrapper">
                <NavigationBar tags={tags} />
                <div className="main-body clear-float">
                    <div className="main-container">
                        {children}
                    </div>
                    <InfoSideBar />
                </div>
                <Footer />
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
