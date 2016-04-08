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

## 作业
### 阅读
### 深入理解 react
http://reactjs.cn/react/docs/thinking-in-react.html


#### 核心内容：
- 使用 react 的步骤
    1. 拆分用户界面成一个组件树
    2. 利用 React ，创建应用的一个静态版本
    3. 识别出最小的（但是完整的）代表 UI 的 `state`
    4. 确认 `state` 的所属组件
    5. 添加反向数据流
- 容器组件，上面第4部中的 **所属组件** 实际上就是找到容器组件，重点思考这种组件和普通组件（stateless）的不同

当我们需要对用户输入、服务器请求或者时间变化等作出响应，这时才需要使用 `State` 。常用的模式是 **创建多个只负责渲染数据的无状态（stateless）组件**，在它们的上层创建一个有状态（stateful）组件(我们常将其称之为组件容器，它和普通组件非常不同)并把它的状态通过 props 传给子级。这个 **有状态的组件封装了所有用户的交互逻辑**，而这些无状态组件则负责 **声明式地渲染数据**。

#### 难点：
1. 添加反向数据流，反向数据流是指，子组件（stateless 组件）要更改父组件（容器组件）中的 state，这时我们会采取在父组件中声明 handle 函数，然后通过 props 传给子组件，子组件在 onxxx 的时候调用此函数，这样就使得整个的数据流仍然是单向的，并且完全由容器组件来控制整个容器内的 state。
2. react 生命周期
