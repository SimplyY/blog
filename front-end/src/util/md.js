import marked from 'marked'

export function md2html(article) {
    hljs.configure({
        tabReplace: '    ', // 4 spaces
        languages:['js', 'html', 'css']
    })

    marked.setOptions({
        highlight: function(code) {
            return hljs.highlightAuto(code).value;
        }
    })

    let html = marked(article)
    return html
}
