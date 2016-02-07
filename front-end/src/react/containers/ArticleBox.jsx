import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import _ from '../../../lib/lodash.core'

import { AppData } from '../../util/AppData'

import * as action from '../actions/articles'

import Article from '../components/Article'
import CurrentTagChain from '../components/CurrentTagChain'
import VoteShareLoveBox from '../components/VoteShareLoveBox'

class ArticleBox extends Component {
    constructor() {
        super()
    }

    shouldComponentUpdate(nextProps){
        let nextArticle = AppData.getAricleByArticleId(nextProps.articles, nextProps.params.articleId)
        let oldArticle = AppData.getAricleByArticleId(this.props.articles, this.props.params.articleId)

        return !_.isEqual(nextArticle, oldArticle)
    }

    render() {
        let {
            tags, articles,
            addAriticleLoveNumber, addAriticleShareNumber, changeArticleGrade
        } = this.props

        const { articleId } = this.props.params

        let currentArticle = AppData.getAricleByArticleId(articles, articleId)
        let currentTag = AppData.getTagByTagName(tags, currentArticle.parentTagName)

        return (
            <div>
                <CurrentTagChain tags={tags} currentTagId={currentTag._id} />
                <Article currentArticle={currentArticle} />
                <VoteShareLoveBox currentArticle={currentArticle}
                    addAriticleLoveNumber={addAriticleLoveNumber}
                    addAriticleShareNumber={addAriticleShareNumber}
                    changeArticleGrade={changeArticleGrade} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tags: state.data.get('tags').toJS(),
        articles: state.data.get('articles').toJS()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addAriticleLoveNumber: bindActionCreators(action.addAriticleLoveNumberAction, dispatch),
        addAriticleShareNumber: bindActionCreators(action.addAriticleShareNumberAction, dispatch),
        changeArticleGrade: bindActionCreators(action.changeArticleGradeAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleBox)
