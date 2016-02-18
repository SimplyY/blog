export function enterNewRouter(path, dispatch, push) {
    window.scrollTo(0, 0)
    dispatch(push('/'))
}

export function getPathType(urlPathname) {
    return urlPathname.split('/')[1]
}

export function isUrlInAnchor() {
    return location.href.indexOf('#') !== -1 && location.href.split('#')[1]
}

export function anchorHandler(e) {
    if (e.target.className !== 'iconfont article-anchor') {
        return
    }

    e.preventDefault()
    let anchorName = e.target.href.split('#')[1]
    if (location.href.indexOf('#') === -1) {
        location.href += '#' + anchorName
    }
    else {
        location.href = location.href.split('#')[0] + '#' + anchorName
    }
    scrollToAnchor(e.target.offsetTop, 30)
}

export function showAnchor() {
    let anchorName = location.href.split('#')[1]
    let anchorDOM = document.getElementById(anchorName)

    // for dom load img will change dom position, so delay
    setTimeout(function() {
        scrollToAnchor(anchorDOM.offsetTop, 42)
    }, 300)
}

// fixed nav-bar make a wrong offsetTop
// so make anchor scroll right position by distance
function scrollToAnchor(anchorOffsetTop, distance) {
    window.scrollTo(0, anchorOffsetTop + distance)
}
