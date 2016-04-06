import { sanitize } from 'dompurify'
import * as text from '../consts/text'

export function isNodeEnv() {
    return typeof window === 'undefined' && typeof process === 'object'
}

export function setPageTitle(title) {
    if (isNodeEnv()) {
        GLOBAL.blog.title = text.TITLE_PREFIX + title
    }
    else {
        document.title = text.TITLE_PREFIX + title
    }
}

export function sanitizeHTML(html) {
    if (isNodeEnv()) {
        return html
    }
    return sanitize(html)
}

export function scrollToTop() {
    window.scrollTo(0, 0)
}

export function getPathType(urlPathname) {
    if (urlPathname === undefined || urlPathname === null) {
        return
    }

    return urlPathname.split('/')[1]
}

export function loadScript(url, callback) {
    if (isNodeEnv()) {
        return
    }

    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    //借鉴了jQuery的script跨域方法
    script.onload = script.onreadystatechange = function(){
        if((!this.readyState||this.readyState === 'loaded'||this.readyState === 'complete')){
            callback && callback();
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
        }
    };
    head.appendChild(script);
}

export function isUrlInAnchor() {
    return location.href.indexOf('#') !== -1 && location.href.split('#')[1]
}

const ANCHOR_DISTANCE = 48
export function jumpToAnchor(e) {
    e.preventDefault()
    let href = e.target.href === undefined ? e.target.dataset.href : e.target.href
    let anchorId = href.split('#')[1]
    let anchorDOM = document.getElementById(anchorId)

    let anchorName
    if (anchorDOM === null) {
        anchorDOM = getAnchorDOMbyHref(href)
        anchorName = anchorDOM.href.split('#')[1]
    }
    else {
        anchorName = anchorDOM.id
    }

    // deal location href
    if (location.href.indexOf('#') === -1) {
        location.href += '#' + anchorName
    }
    else {
        location.href = location.href.split('#')[0] + '#' + anchorName
    }

    scrollToAnchor(anchorDOM.offsetTop, ANCHOR_DISTANCE)
}

function getAnchorDOMbyHref(href) {
    let anchorDOM

    let articleDOM = document.getElementById('article-content')
    let anchorsDOM = articleDOM.getElementsByTagName('a')
    for (let i = 0; i < anchorsDOM.length; i++) {
        if (anchorsDOM[i].href.split('#')[1] === href.split('#')[1]) {
            anchorDOM = anchorsDOM[i]
        }
    }
    return anchorDOM
}

export function showAnchor() {
    let anchorId = location.href.split('#')[1]
    anchorId = decodeURI(anchorId)
    let anchorDOM = document.getElementById(anchorId)

    if (anchorDOM === null) {
        anchorDOM = getAnchorDOMbyHref(decodeURI(location.href))
        if (anchorDOM === undefined) {
            return
        }
        scrollToAnchor(anchorDOM.offsetTop, ANCHOR_DISTANCE)
    }
    else {
        setTimeout(function() {
            scrollToAnchor(anchorDOM.offsetTop, ANCHOR_DISTANCE)
        }, 0)
    }

    // for dom load img will change dom position, so delay
    setTimeout(function() {
        scrollToAnchor(anchorDOM.offsetTop, ANCHOR_DISTANCE)
    }, 300)
}

// fixed nav-bar make a wrong offsetTop
// so make anchor scroll right position by distance
function scrollToAnchor(anchorOffsetTop, distance=ANCHOR_DISTANCE) {
    window.scrollTo(0, anchorOffsetTop + distance)
}
