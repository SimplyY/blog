import marked from '../../lib/hackedMarked'

marked.setOptions({
    highlight: function(code) {
        return hljs.highlightAuto(code).value;
    }
})

export function md2html(article) {
    let html = marked(article)
    return html
}
