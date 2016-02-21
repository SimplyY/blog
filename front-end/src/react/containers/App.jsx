import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    showContentTableAction, hiddenContentTableAction, loadContentTableContentAction
} from '../actions/contentTable'

import NavigationBar from '../components/NavigationBar'
import InfoSideBar from '../components/InfoSideBar'
import ContentTable from '../components/ContentTable'

class App extends Component {
    constructor() {
        super()
    }
    render() {
        const {
            children, tags, contentTable,
            showContentTable, hiddenContentTable, loadContentTableContent
        } = this.props

        return (
            <div className="main-wrapper">
                <NavigationBar tags={tags} />
                <ContentTable contentDOMId='article-content' wrapperId='main-body'
                    showContentTable={showContentTable}
                    hiddenContentTable={hiddenContentTable}
                    loadContentTableContent={loadContentTableContent}
                    contentTable={contentTable} />
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
        tags: state.data.get('tags').toJS(),
        contentTable: state.contentTable.toJS()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showContentTable: bindActionCreators(showContentTableAction, dispatch),
        hiddenContentTable: bindActionCreators(hiddenContentTableAction, dispatch),
        loadContentTableContent: bindActionCreators(loadContentTableContentAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
