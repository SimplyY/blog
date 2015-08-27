(function(doc, window) {
    var resizeCall = function(){
        var docEl = doc.documentElement;
        var clientWidth = window.screen.width;
        if (!clientWidth){
            return;
        }
        if (clientWidth > 800){
            docEl.style.fontSize = 8 * (clientWidth / 320) + 'px';
        }else{
            docEl.style.fontSize = 16 * (clientWidth / 320) + 'px';
        }
    };

    doc.addEventListener('DOMContentLoaded', resizeCall, false);
})(document, window);
