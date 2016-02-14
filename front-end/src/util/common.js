export function anchorHandler(e) {
    e.preventDefault()
    let anchorName = e.target.href.split('#')[1]
    if (location.href.indexOf('#') === -1) {
        location.href += '#' + anchorName
    } else {
        location.href = location.href.split('#')[0] + '#' + anchorName
    }
    scrollToAnchor(e.target.offsetTop, 30)
    // TODO: highliaht animation
}

export function showAnchor() {
    let anchorName = location.href.split('#')[1]
    let anchorDOM = document.getElementById(anchorName)
    scrollToAnchor(anchorDOM.offsetTop, 42)
}

// fixed nav-bar make a wrong offsetTop
// so make anchor scroll right position by distance
function scrollToAnchor(anchorOffsetTop, distance) {
    console.log(anchorOffsetTop + distance)
    window.scrollTo(0, anchorOffsetTop + distance)
}
