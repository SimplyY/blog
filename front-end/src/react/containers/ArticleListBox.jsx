import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { AppData } from '../../util/AppData'

import { showMoreArticleAction } from '../actions/articles'

import InvalidUrlBox from '../containers/InvalidUrlBox'
import ArticleList from '../components/ArticleList'
import CurrentTagChain from '../components/CurrentTagChain'

import { getPathType, setPageTitle } from '../../util/common'
import * as config from '../../consts/config'
import * as text from '../../consts/text'

class ArticleListBox extends Component {
    constructor() {
        super()
    }
    render() {
        let {
            articles, tags, showMoreArticle, showedArticlesMaxNumber,
            urlPathname
        } = this.props
        const tagId = this.props.params.tagId

        let pathType = getPathType(urlPathname)
        let showedArticles = getShowedArticles(pathType, articles, tags, tagId)

        // if url is illeagal
        if (showedArticles === undefined) {
            return (
                <InvalidUrlBox />
            )
        }

        return (
            <div className="article-list-box">
                <CurrentTagChain pathType={pathType} tags={tags} currentTagId={tagId} />
                <ArticleList showedArticles={showedArticles}
                    showMoreArticle={showMoreArticle}
                    showedArticlesMaxNumber={showedArticlesMaxNumber} />
            </div>
        )
    }
}

function getShowedArticles(pathType, articles, tags, tagId) {
    let showedArticles
    // get showedArticles by url path type
    switch (pathType) {
        case config.HOT_STR:
            showedArticles = AppData.getHotSortedArticles(articles)
            setPageTitle(text.HOT_TEXT)
            break
        case config.TAG_STR:
            showedArticles = AppData.getArticlesByTagId(articles, tags, tagId)
            let tag = AppData.getTagById(tags, tagId)
            setPageTitle(tag.tagName)
            break
        // root path case show all articles
        case config.ROOT_STR:
            showedArticles = articles
            setPageTitle(text.ALL_ARTICLES_STR)
            break
        default:
            showedArticles = undefined
    }
    return showedArticles
}

function mapStateToProps(state) {
    return {
        tags: state.data.get('tags').toJS(),
        articles: state.data.get('articles').toJS(),
        showedArticlesMaxNumber: state.data.get('showedArticlesMaxNumber'),

        urlPathname: state.routing.location.pathname
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showMoreArticle: bindActionCreators(showMoreArticleAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListBox)
