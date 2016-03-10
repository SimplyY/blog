import React, {Component} from 'react'

import { scrollToTop } from '../../util/common'
import { Link } from 'react-router'

class Tag extends Component {
    constructor() {
        super()
    }
    render() {
        let { id, url, text, child } = this.props

        return (
            <li key={id}>
                <Link className="nav-tag-content" to={url} onClick={scrollToTop}>
                    {text}
                </Link>
                {child}
            </li>
        )
    }
}

export default Tag
