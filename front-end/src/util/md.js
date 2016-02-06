import marked from 'marked'

export function md2html(article) {
    marked.setOptions({
        highlight: function(code) {
            return hljs.highlightAuto(code).value;
        }
    })

    let html = marked(article)
    return html
}
