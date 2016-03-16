import React, {Component} from 'react'

class Md2pdf extends Component {
    constructor() {
        super()
        this.state = {
            hasLoadLibs: false,
            md: ''
        }


    }
    render() {
        if (!this.state.hasLoadLibs) {
            loadLibs(this.state)
        }
        let previewDOM
        if (this.state.hasLoadLibs) {
            previewDOM = (
                <div id="tools-md2pdf-preview" className="markdown-body"
                    dangerouslySetInnerHTML={{__html: marked(this.state.md)}}>
                </div>
            )
        }

        return (
            <div>
                <div className="md-input-box">
                    <div className="md-input-header">
                        在这里输入 md（建议粘贴过来，不建议在这里输入，注需要严格的 md 语法）
                    </div>
                    <div>
                        <a className="print-this-page" href="javascript:window.print()">click there to get pdf or print</a>
                    </div>
                    <textarea id="md-input"
                        autoFocus="true"
                        onInput={e => this.setState({md: e.target.value})}>
                    </textarea>
                </div>
                {previewDOM}
            </div>
        )
    }
}


function loadLibs(state) {
    loadScript('//cdn.bootcss.com/marked/0.3.5/marked.js', () => {
        loadScript('//cdn.bootcss.com/highlight.js/9.2.0/highlight.min.js', () => {
            state.hasLoadLibs = true
            marked.setOptions({
                highlight: function(code) {
                    return hljs.highlightAuto(code).value;
                }
            })
        })
    })
}

function loadScript(url, callback){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    //借鉴了jQuery的script跨域方法
    script.onload = script.onreadystatechange = function(){
        if((!this.readyState||this.readyState === 'loaded'||this.readyState === 'complete')){
            callback && callback();
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
        }
    };
    // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
    head.insertBefore(script, head.firstChild);
}

export default Md2pdf
