import { LOAD_MUST_ARTICLES, LOAD_ALL_ARTICLES } from '../../consts/ActionTypes'
import { appData } from '../../data'

const initialState = {
    articles: appData.articles
}

export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_MUST_ARTICLES:
            return action.articles
        case LOAD_ALL_ARTICLES:
            return action.articles
        default:
            return state
    }
}
