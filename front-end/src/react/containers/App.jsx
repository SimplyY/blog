import React, {Component} from 'react'

import NavigationBar from '../components/NavigationBar'
import InfoSideBar from '../components/InfoSideBar'
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
                <InfoSideBar />
                {children}
            </div>
        )
    }
}

export default App
