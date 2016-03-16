import React, {Component} from 'react'

class ToolsBox extends Component {
    constructor() {
        super()
    }
    render() {
        const {
            children
        } = this.props

        return (
            <div className="article-box">
                {children}
            </div>
        )
    }
}

export default ToolsBox
