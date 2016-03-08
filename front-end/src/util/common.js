export function scrollToTop() {
    window.scrollTo(0, 0)
}

export function getPathType(urlPathname) {
    return urlPathname.split('/')[1]
}

export function isUrlInAnchor() {
    return location.href.indexOf('#') !== -1 && location.href.split('#')[1]
}

const ANCHOR_DISTANCE = 42
export function jumpToAnchor(e) {
    e.preventDefault()

    let href = e.target.href === undefined ? e.target.dataset.href : e.target.href
    let anchorId = href.split('#')[1]
    let anchorDOM = document.getElementById(anchorId)
    let anchorName = anchorDOM.id

    // deal lovation href
    if (location.href.indexOf('#') === -1) {
        location.href += '#' + anchorName
    }
    else {
        location.href = location.href.split('#')[0] + '#' + anchorName
    }

    scrollToAnchor(anchorDOM.offsetTop, ANCHOR_DISTANCE)
}

export function showAnchor() {
    let anchorId = location.href.split('#')[1]
    anchorId = decodeURI(anchorId)
    let anchorDOM = document.getElementById(anchorId)

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
