import React, {Component} from 'react'
import { setPageTitle } from '../../util/common'

import * as text from '../../consts/text'

class ToolsBox extends Component {
    constructor() {
        super()
    }
    render() {
        const { children } = this.props
        setPageTitle(text.TOOLS_TEXT)

        return (
            <div className="article-box">
                {children}
            </div>
        )
    }
}

export default ToolsBox
