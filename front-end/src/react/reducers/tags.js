import { GET_TAG } from '../constants/ActionTypes'

const initialState = [
    {
      tagName: '编程'
    }
]


export default function tags(state = initialState, action) {
    switch (action.type) {
        case GET_TAG:
            return state
        default:
            return state
    }
}
