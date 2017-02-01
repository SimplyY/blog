import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { AppData } from '../../util/AppData'

import * as config from '../../consts/config'
import * as text from '../../consts/text'

class CurrentTagChain extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <header className="tag-chain">
                <ol>
                    {this.renderTagChain()}
                </ol>
            </header>
        )
    }

    renderTagChain() {
        let tagChainDOM
        let { pathType, tags, currentTagId } = this.props
        let tag = AppData.getTagById(tags, currentTagId)

        switch (pathType) {
            case config.TAG_STR:
                tagChainDOM = getTagChainDOM(tag, tags)
                break
            case config.ARTICLE_STR:
                tagChainDOM = getTagChainDOM(tag, tags)
                break
            case config.HOT_STR:
                tagChainDOM = (
                    <li>
                        <Link to="/hot">{text.HOT_TEXT}</Link>
                    </li>
                )
                break
            // root path case show all articles
            case config.ROOT_STR:
                tagChainDOM = (
                    <li>
                        <Link to="/">{text.ALL_ARTICLES_STR}</Link>
                    </li>
                )
                break
            default:
                tagChainDOM = (
                    <li>
                        <Link to="/">{text.ALL_ARTICLES_STR}</Link>
                    </li>
                )
        }
        return tagChainDOM
    }
}

function getTagChainDOM(tag, tags) {
    let tagChain = tag.parentsTagNameArray

    tagChain = tagChain.map((item) => AppData.getTagByTagName(tags, item))
    const allArticleId = 'all article'
    tagChain.unshift({
      _id: allArticleId,
      tagName: '所有文章'
    })
    tagChain.push(tag)

    let tagChainDOM = tagChain.map(item => {
        return (
            <li key={item._id} >
                <Link to={getUrl(item)}>{item.tagName}</Link>
            </li>
        )
    })
    return tagChainDOM

    function getUrl (tag) {
      if (tag._id === allArticleId) {
        return '/'
      } else {
        return '/' + config.TAG_PATH + tag._id
      }
    }
}

export default connect()(CurrentTagChain)
