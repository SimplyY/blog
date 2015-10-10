function Editor(input, preview) {
    this.update = function() {
        preview.innerHTML = markdown.toHTML(input.value);
    };
    this.update();
}

function inputTitle() {
    var title = "##" + $("title").value;
    $('preview-title').innerHTML = markdown.toHTML(title);
}

var $ = function(id) {
    return document.getElementById(id);
};

var input = $("text-input");
input.editor = new Editor(input, $("preview-content"));
