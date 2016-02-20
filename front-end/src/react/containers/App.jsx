import React, {Component} from 'react'
import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'
import InfoSideBar from '../components/InfoSideBar'
import ContentTable from '../components/ContentTable'

class App extends Component {
    constructor() {
        super()
    }
    render() {
        const { children, tags } = this.props

        return (
            <div className="main-wrapper">
                <NavigationBar tags={tags} />
                <ContentTable contentDOMId='article-content' wrapperId='main-body'/>

                <div id="main-body" className="main-body clear-float">
                    <div className="main-container">
                        {children}
                    </div>
                    <InfoSideBar tags={tags} />
                </div>
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
