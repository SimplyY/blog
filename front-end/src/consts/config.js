export const LATEST_ARTICLES_NUMBER = 100
export const FIRST_SHOWED_ARTICLES_MAX_NUMBER = 15
export const SHOW_MORE_ARTICLES_NUMBER = 10
export const PATH_TYPE_IN_SPLIT_NUMBER = 3

export const SORT_QUREY_STR = '?sort=-date'
export const QUREY_SELECT_META_STR = 'select=-md -html'
export const SORT_LIMIT_QUERY_STR = SORT_QUREY_STR + '&limit=' + LATEST_ARTICLES_NUMBER + '&' + QUREY_SELECT_META_STR

export const ROOT_STR = ''
export const TAG_STR = 'tag'
export const ARTICLE_STR = 'article'
export const CHART_STR = 'chart'
export const HOT_STR = 'hot'

// path
export const TAG_PATH = TAG_STR + '/'
export const ARTICLE_PATH = ARTICLE_STR + '/'
export const CHART_PATH = CHART_STR + '/'
export const HOT_PATH = HOT_STR
export const ABOUT_ARTICLE_ID = '56e386ac12fedb222a40931f'

export const wrapperMoveClass = ' wrapper-move'
