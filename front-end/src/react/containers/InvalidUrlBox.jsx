import React, {Component} from 'react'

import { INVALED_URL_TIP } from '../../consts/text'

class InvalidUrlBox extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                {INVALED_URL_TIP}
            </div>
        )
    }
}

export default InvalidUrlBox
