import React, {Component} from 'react'

import { loadScript, sanitizeHTML, isNodeEnv } from '../../../util/common'

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
        if (this.state.hasLoadLibs && !isNodeEnv() && marked) {
            previewDOM = (
                <div id="tools-md2pdf-preview" className="markdown-body"
                    dangerouslySetInnerHTML={{__html: sanitizeHTML(marked(this.state.md))}}>
                </div>
            )
        }

        return (
            <div>
                <div className="md-input-box">
                    <div className="md-input-header">
                        <p>在下面输入 Markdown</p>
                        <br/>
                        <p>建议粘贴过来，不建议在这里输入</p>
                        <p>注需要严格的 md 语法(比如 # test not #test)</p>
                        <p>chrome 导出 pdf 最大的优势是，你自己可以改 css</p>
                    </div>
                    <div>
                        <a className="print-this-page" href="javascript:window.print()">
                             click there to get pdf or print
                         </a>
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
    if (isNodeEnv()) {
        return
    }
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

export default Md2pdf
