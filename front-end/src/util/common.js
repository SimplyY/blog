export function anchorHandler(e) {
    window.scrollTo(0, e.target.offsetTop - 80)
    e.preventDefault()
    // TODO: highliaht animation
}
