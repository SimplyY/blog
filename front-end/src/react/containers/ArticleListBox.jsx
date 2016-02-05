import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AppData } from '../../util/AppData'

import ArticleList from '../components/ArticleList'
import InvalidUrl from '../components/InvalidUrl'

import { INVALED_TAG_URL_TIP } from '../../consts/tips'

class ArticleListBox extends Component {
    constructor() {
        super()
    }
    render() {
        let { articles, tags } = this.props
        const tagId = this.props.params.tagId
        let showArticles = AppData.getAriclesByTagId(articles, tags, tagId)

        if (showArticles === undefined) {
            return (
                <InvalidUrl info={INVALED_TAG_URL_TIP} />
            )
        }

        return (
            <div>
                <ArticleList showArticles={showArticles}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        articles: state.data.get('articles').toJS(),
        tags: state.data.get('tags').toJS()
    }
}

export default connect(mapStateToProps)(ArticleListBox)
