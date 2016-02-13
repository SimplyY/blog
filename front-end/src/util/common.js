export function anchorHandler(e) {
    e.preventDefault()
    let anchorName = e.target.href.split('#')[1]
    if (location.href.indexOf('#') === -1) {
        location.href += '#' + anchorName
    } else {
        location.href = location.href.split('#')[0] + '#' + anchorName
    }
    window.scrollTo(0, e.target.offsetTop + 30)
    // TODO: highliaht animation
}
