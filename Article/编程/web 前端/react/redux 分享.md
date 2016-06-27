# redux 分享
## redux 的特别之处
redux 的 Store **不再拥有状态，而只是管理状态**。

所以首先要明确一个概念，Store 和 State 是有区别的，Store 并不是一个简单的数据结构，State 才是，Store 会包含一些方法来管理 State，比如获取／修改 State。

> 然后在 调用 store 里修改 state 的方法 时候，redux 提出了一个新概念，将具体 **如何修改 state** 交给 纯函数 reducer 来处理，后面会详细介绍 reducer。

基于这样的 Store，可以做很多扩展，这也是 Redux 强大之处。

## Redux 的基础概念
### 三个基本原则
1. 整个应用只有唯一一个可信数据源(也就是一个应用只有一个 Store 实例)
2. State 只能通过触发 Action 来更改
3. **State 的更改** 必须写成纯函数(Reducer)，也就是每次更改总是返回一个新的 State

### 看图说话
![](http://7xkpdt.com1.z0.glb.clouddn.com/34ac9de05c0ad25b3bec202a067a618a.png)

整个 redux 的使用分为两个流程：初始化过程，数据流过程

#### 基本概念
- 图中的 dispatch 是 store.dispatch(action), 也就是分发一个 action，它是每次数据改变的源头。
- reducer 则是管理(根据不同 action 用相应策略修改) state, 也就是 `(oldState, action) => newState` 的集合。当 action 被分发，就会由 reducer 根据 action 的类型来调用对应的 `(oldState, action) => newState` 。
- listener 则是业务上的回调函数，当 state 改变的时候被调用（比如使 state 改变后 view 自动改变）。
- view 即 react， 会在最后说如何将 redux 和 react 联合使用。

#### 初始化过程
1. 使用 reducer 去 createStore
2. 然后用返回的 store 去 subscribe listenner

#### 数据流过程
这样以来subscribe 后，就进入了上图红色部分，可以进行 dispatch(action)了，这也就是进入 了 redux 的数据流。

## 使用
接下来我们分别详细介绍一下 Actions、Reducers、Store 的使用。

### Actions
Action 很简单，就是一个单纯的包含 `{ type, payload }` 的对象，type 是一个常量用来标示动作类型，`payload` 是这个动作携带的数据。

我们会使用函数（Action Creators）来生成 action，这样会有更大的灵活性，Action Creators 是一个 pure function，调用它，就可以返回一个 action 对象：

> Action Creators 的写法


```js
function addTodo(text) {
    return {
        type: 'ADD_TODO',
        payload: text
    }
}
```

然后触发 action 的写法

```js
store.dispatch(addTodo(text))
```

### Reducers
Action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。而这正是 reducer 要做的事情。


一个 reducer 函数会接受 oldState 和 action 两个参数，返回一个新的 state：也就是`(oldState, action) => newState`。一个简单的 reducer 可能类似这样：

```js
const initialState = {
    a: 'a',
    b: 'b'
};

function someApp(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_A':
            return { ...state, a: 'Modified a' };
        case 'CHANGE_B':
            return { ...state, b: action.payload };
        default:
            return state
    }
}
```

值得注意的有两点：

- 我们用到了 object spread 语法 确保不会更改 oldState 而是返回一个 newState
- 对于不需要处理的 action，直接返回 oldState

Reducer 也是 pure function，这点非常重要，所以绝对不要在 reducer 里面做一些引入 side-effects 的事情，比如：

- 修改 state 参数对象（即更改 oldState）
- 执行有副作用的操作，如 API 请求和路由跳转
- 调用非纯函数

### 拆分 reducer
因为 Redux 里面只有一个 Store，对应一个 State 状态，所以整个 State 对象就是由一个 reducer 函数管理，但是如果所有的状态更改逻辑都放在这一个 reducer 里面，显然会变得越来越巨大，越来越难以维护。

得益于纯函数的实现，我们只需要稍微变通一下，让状态树上的每个字段都有一个 reducer 函数来管理就可以拆分成很小的 reducer 了：

```js
function someApp(state = {}, action) {
    return {
        a: reducerA(state.a, action),
        b: reducerB(state.b, action)
    };
}
```

对于 reducerA 和 reducerB 来说，他们依然是形如：`(oldState, action) => newState` 的函数，只是这时候的 state 不是整个状态树，而是树上的特定字段，每个 reducer 只需要判断 action，管理自己关心的状态字段数据就好了。

Redux 提供了一个工具函数 combineReducers 来简化这种 reducer 合并：

```js
import { combineReducers } from 'redux';

const someApp = combineReducers({
    a: reducerA,
    b: reducerB
});
```

像 someApp 这种管理整个 State 的 reducer，可以称为 root reducer。


### Store

现在有了 Action 和 Reducer，Store 的作用就是连接这两者，Store 的作用有这么几个：

- Hold 住整个应用的 State 状态树
- 提供一个 getState() 方法获取 State
- 提供一个 dispatch() 方法发送 action 更改 State
- 提供一个 subscribe() 方法注册回调函数监听 State 的更改

创建一个 Store 很容易，将 root reducer 函数传递给 createStore 方法(redux 已经帮我们实现)即可：

```js
import { createStore } from 'redux';
import someApp from './reducers';
let store = createStore(someApp);

// 你也可以额外指定一个初始 State（initialState），这对于服务端渲染很有用
// let store = createStore(someApp, window.STATE_FROM_SERVER);
```

现在我们就拿到了 store.dispatch，可以用来分发 action 了：

```js
// some callback as subscribe() param, will be used when reducers retren new state
let unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch
store.dispatch({ type: 'CHANGE_A' });
store.dispatch({ type: 'CHANGE_B', payload: 'Modified b' });

// Stop listening to state updates
unsubscribe();
```


### Data Flow

以上提到的 store.dispatch(action) -> reducer(state, action) -> store.getState() 其实就构成了一个“单向数据流”，我们再来总结一下。

#### 1. 调用 store.dispatch(action)
Action 是一个包含 { type, payload } 的对象，它描述了“发生了什么”，比如：

```js
{ type: 'LIKE_ARTICLE', articleID: 42 }
{ type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
{ type: 'ADD_TODO', text: 'Read the Redux docs.' }
```

#### 2. Action 会触发给 Store 指定的 root reducer

root reducer 会返回一个完整的状态树(state 对象)，State 对象上的各个字段值可以由各自的 reducer 函数处理并返回新的值。

- reducer 函数接受 (state, action) 两个参数
- reducer 函数判断 action.type 然后处理对应的 action.payload 数据来更新并返回一个新的 state

#### 3. Store 会保存 root reducer 返回的状态树
新的 State 会替代旧的 State，然后所有 store.subscribe(listener) 注册的回调函数会被调用，在回调函数里面可以通过 store.getState() 拿到新的 State。

#### 4. 改变 View
在回调函数的 listener，我们可以通过 store.getState() 拿到新的 State，再将新的 state 渲染成新的 View，也就是改变了 View。

> 这就是 Redux 的运作流程，接下来看如何在 React 里面使用 Redux。


## 在 React 应用中使用 Redux（react-redux）

Redux 也是需要注册一个回调函数 store.subscribe(listener) 来获取 State 的更新(store.getState() 拿到新的 State)，然后我们要在 listener 里面调用 setState() 来更新 React 组件。

Redux 官方提供了 [react-redux](https://github.com/rackt/react-redux) 来简化 React 和 Redux 之间的绑定，不再需要手动注册／解绑回调函数。

整个在 React 应用中使用 Redux（react-redux）的流程，总共分为两步：
1. 使用 Provider 在根组件 注入 Store
2. 容器组件使用 connect() 方法连接 Redux

也就是说我们需要在 **根组件中创建这个 store** 并传入根组件，然后我们来连接 store 和容器组件，最后我们就可以一层一层的把 store 的功能（state 和 dispatch）传进子组件。

这时候，store 的功能在我们的 react 组件中就可以无处不在了。

> 我们来看看具体怎么做

### 注入 Redux Store（重要）


注入 Redux Store 的方法，就是将整个视图结构(App 组件) 包装进 react-redux `<Provider>`。

```js
import ReactDOM from 'react-dom';
import { Component } from 'react';
import { Provider } from 'react-redux';

class App extends Component {
    render() {
        // ...
    }
}

const targetEl = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    targetEl
);
```

### 容器组件使用 connect() 方法连接 Redux（重要）

本库深受 **分离容器组件和展示组件** 思想启发。

在应用中，只有 **最顶层组件是对 Redux 可知**（例如路由处理）这是很好的。所有它们的子组件都应该是“笨拙”的，并且是通过 props 获取数据。

|            | 容器组件              | 展示组件              |
|:-----------|:----------------------|:----------------------|
| 位置       | 最顶层、路由处理     | 中间和子组件          |
| 使用 Redux | 是                    | 否                    |
| 读取数据   | 从 Redux 获取 state   | 从 props（可以是 store 的 state） 获取数据     |
| 修改数据   | 向 Redux 发起 actions | 从 props（可以是 store 的 dispatch） 调用回调函数 |

我们可以发现展示组件需要 store.state 和 store.dispatch 这样的 props，后面的 connect 方法，就是将这俩变成 props 传给组件。

#### 作用 why do this？
> 实际上它就是在帮你 **把容器组件连接上 store**，也就是在这里完成 store 在此组件的 **职责**


1. 有了它 **你不需要在 react 组件里面手动注册** `store.subscrible(listener)`，和在 `listener` 里手动`store.setState(newState)`，connect() 已经帮你自动完成了。
    - 因为这里的 `connect()` 已经非常聪明的帮你在组件里 `subscrible(handleChange)`。
    - 而且 `handleChange` 方法里调用了 `store.setState()`（react 组件更新 state 的方式）
    - 这样以来，当 state change 的时候，view 也就被自动重新 render了。整个过程都是自动化的（非常棒，但是大家要知道原理）。
2. 如何 **很方便的将 store 的 state 和 dispath 以 props 的形式分发给容器组件**，这里就是作为两个参数传给 connect，即 **mapStateToProps、mapDispatchToProps**(很重要) 作为 connect 的参数。

#### state and dispath
子组件获取 state and dispath 的方式，通过父组件传递 props 即可

react-redux 提供的 connect() 允许你从 Redux store 中指定准确的 state 到想要获取 state 的组件中。这让你在任何组件里能获取到任何级别颗粒度的数据。

而 dispatch 则允许此组件或子组件拥有 store.dispatch 的引用，这样在组件的 view 的交互功能里就可以产生新的 action，并 dispatch(action)

#### 使用方法

实现时需要俩函数 mapStateToProps、mapDispatchToProps 作为 connect 的参数，具体代码就像下面这样。

```js
// containers/CounterContainer.js

import { Component } from 'react';
import { connect } from 'react-redux';

import Counter from '../components/Counter';
import { increment } from '../actionsCreators';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        value: state.counter
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        onIncrement: () => dispatch(increment())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```


然后我们就可以在 render 等函数(组件 class 的方法)里面 取出相应 props，自己使用或者传给子组件

![](http://7xkpdt.com1.z0.glb.clouddn.com/23de2473748fcdc580eadf3d7884fba4.png)

![](http://7xkpdt.com1.z0.glb.clouddn.com/8f1b9d879892a4f6c22d4f718cb86034.png)

![](http://7xkpdt.com1.z0.glb.clouddn.com/92da3baee49699f72ed8f7aa6fb8bb11.png)



## 参考链接
Redux 中文文档: https://camsong.github.io/redux-in-chinese/docs/introduction/index.html
