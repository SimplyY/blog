# web前端 thinking 教程(4):

## 习题讲解
代码仓库在 https://github.com/SimplyY/webpack-es6-react-demo

### 关键知识点：
0. import、bind 语法
1. this.props
2. this.states
3. this.setState
4. jsx
5. render

### 优点
1. react 封装了 DOM，无 DOM 操作，并保证了不错的浏览器兼容性
2. 组件化的思想，复用组件非常方便，并且开发的时候采用分治的思想，非常利于维护
3. 拥抱 es6，代码更优雅
4. js 来掌控 html 的显示，使其灵活性更高，不过相应的会在初期开发增加一点开发成本

### 代码
```js
// main.jsx
import React from 'react'
import { render } from 'react-dom'

import Root from './Root'

render(
    <Root />,
    document.getElementById('root')
)

```

```js
// Root.jsx
import React, {Component} from 'react'
import AutoComplete from './component/AutoComplete'

const dataArray = ['a', 'ab', 'abc', 'data', 'dataArray']

class Root extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <AutoComplete dataArray={dataArray}/>
            </div>
        )
    }
}


export default Root
```

```js
// AutoComplete.jsx
import React, {Component} from 'react'

class AutoComplete extends Component {
    constructor() {
        super()
        this.state = {
            inputStr: ''
        }
    }

    render() {
        const { dataArray } = this.props
        const tips = getTips(dataArray, this.state.inputStr)

        return (
            <div>
                <input className="auto-complete-input" onChange={handleChange.bind(this)}/>
                <div className="auto-complete-tips">
                    {tips.map(item => {
                        return (
                            <li key={item}>{item}</li>
                        )
                    })}
                </div>
            </div>
        )
    }
}

function handleChange(event) {
    this.setState({inputStr: event.target.value.trim()})
}

function getTips(dataArray, inputStr) {
    let tips

    if (inputStr === '') {
        tips = []
    } else {
        tips = dataArray.filter(item => {
            return item.toLowerCase().indexOf(inputStr.toLowerCase()) >= 0
        })
    }

    return tips
}

export default AutoComplete
```

##### react 教程
http://reactjs.cn/react/docs/tutorial.html

##### 深入理解 react
http://reactjs.cn/react/docs/thinking-in-react.html
