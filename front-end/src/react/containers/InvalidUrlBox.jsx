import React, {Component} from 'react'

import { INVALED_URL_TIP } from '../../consts/text'

import { setPageTitle } from '../../util/common'

class InvalidUrlBox extends Component {
    constructor() {
        super()
    }
    render() {
        setPageTitle(INVALED_URL_TIP)
        return (
            <div>
                {INVALED_URL_TIP}
            </div>
        )
    }
}

export default InvalidUrlBox
