export const FIRST_SHOWED_ARTICLES_MAX_NUMBER = 10
export const SHOW_MORE_ARTICLES_NUMBER = 10

// qurey str
export const SORT_QUREY_STR = '?sort=-date'
export const MUST_DATA_SELECT_STR = '-md -html -minHtml -contentOfTable -comments'

export const ROOT_STR = ''
export const TAG_STR = 'tag'
export const ARTICLE_STR = 'article'
export const CHART_STR = 'chart'
export const HOT_STR = 'hot'

export const MD2PDF_STR = 'md2pdf'

// path
export const TAG_PATH = TAG_STR + '/'
export const ARTICLE_PATH = ARTICLE_STR + '/'
export const CHART_PATH = CHART_STR + '/'
export const HOT_PATH = HOT_STR

export const TOOLS_STR = 'tools'
export const TOOLS_PATH = TOOLS_STR + '/'
export const MD2PDF_TOOL_PATH = TOOLS_PATH + MD2PDF_STR

import { isNodeEnv } from '../util/common'

let ABOUT_ARTICLE_ID
if (isNodeEnv() || document.domain === 'localhost') {
    ABOUT_ARTICLE_ID = '56f2a88292734392717169f3'
}
else {
    ABOUT_ARTICLE_ID = '56cb46564496cee272dea173'
}
export { ABOUT_ARTICLE_ID }
