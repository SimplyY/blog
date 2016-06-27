# redux-thunk 学习过程
> 记一次弄懂 redux-thunk 源码及功能的过程

本文包括3部分：
1. redux-thunk 源码
2. 多个连续的箭头函数与柯里化
3. redux 异步 action creator

![](http://7xkpdt.com1.z0.glb.clouddn.com/ff4e407148a6e45da5da0b440a7e01d9.png)

我第一眼看上去无法理解它的功能和他代码到底干了上面，尤其是多个连续的箭头函数。

如果能懂，并且知道 柯里化、 thunk、redux 异步 action 函数，那这篇文章就完全不用读了。

## 高阶函数
> 高阶函数定义：将函数作为参数或者返回值是函数的函数。

所以高阶函数分两种：
1. 是我们常见的 `sort`,`reduce` 等函数。
2. 返回值是函数的函数。

一般而言，我们要理解常见的高阶函数还是很容易的。比如：

```js
function add(a) {
    return function(b) {
        return a + b
    }
}

var add3 = add(3)
add3(4) === 3 + 4 //true

```
add 函数 在 es6 里的写法等价为

```js
let add = a => b => a + b
```
其实以上就是 柯里化函数 只不过用 es6 写，变了一个样子，后面详细介绍它的原理和特点。

## 多个连续的箭头函数
but 当一堆箭头函数在你面前的时候，你会不会有一丝犹豫，我在此之前就是一脸懵逼。。。比如我看到下面的 redux-thunk 的源码（没错整个源码只有14行）里的多个连续箭头函数的时候。。。
```js
// 形如
a => b => c => {xxx}
```

![](http://7xkpdt.com1.z0.glb.clouddn.com/ff4e407148a6e45da5da0b440a7e01d9.png)


那怎么轻松理解这些箭头干了啥呢，当我看了柯里化后，瞬间就懂了，

> 多个连续箭头函数就是 es6的多次柯里化的写法


## 柯里化
我们先看 stackoverflow 的关于如何理解多个箭头函数的最高票回答,

他说 这就是柯里化函数。(This is a curried function)

![](http://7xkpdt.com1.z0.glb.clouddn.com/215e06423ca5fbf028d45e59f468dcaa.png)


> wiki 的柯里化定义:
> 把接受多个参数的函数变换成接受一个单一参数的函数，并且返回（接受余下的参数而且返回结果的）新函数的技术

好，现在懂没，我来简单说一下。


关键就是理解柯里化，其实可以把它理解成，柯里化后，将第一个参数变量存在函数里面了(闭包)，然后本来需要n个参数的函数可以变成只需要剩下的（n - 1个）参数就可以调用，比如

```js
let add = x => y => x + y
let add2 = add(2)
```

本来完成 add 这个操作，应该是
```js
let add = (x, y) => x + y
```
它需要俩参数，而现在 add2 函数完成同样操作只需要一个参数，这在函数式编程中广泛应用。

详细解释一下，就是 add2 函数 等价于 有了 x 这个闭包变量的 `y => x + y` 函数

![](http://7xkpdt.com1.z0.glb.clouddn.com/0ae9ad31b12e9c5a150de309426a334d.png)

并且此时 x = 2，所以此时调用

```js
add2(3) === 2 + 3
```

## 回归正题
```js
let add = x => y => x + y
```

add 函数按照 wiki 的定义可以理解成只柯里化了一次，那么下面这种呢？

```js
a => b => c => {xxx}
```

**n 个连续箭头组成的函数实际上就是柯里化了 n - 1次。**

具体调用过程如下：

> 本来需要 n 个参数的函数，柯里化 m 次，就要调用 m + 1 次。前 m 次调用，按序传递前 m 个参数中每个参数，并且每次都是返回下次要去调用的函数；直到调用到第 m + 1 次的时候，才返回原函数的返回值。


结合上文可知，这里的多个连续箭头（无论俩个箭头函数三个及以上）函数连在一起 就是在柯里化。

所以连续箭头函数就是多次柯里化函数的 es6 写法。

```js
let test = a => b => c => {xxx}
```

### 调用特点
```js
let test = a => b => c => {xxx}
```
比如对于上面的 `test` 函数，它有 3 个箭头， 这个函数要被调用 3 次 `test(a)(b)(c)`，每次传递一个参数，最后会返回 `{xxx}` 代码段的返回值，并且在 `{xxx}` 代码段中可以调用 a,b,c

### 柯里化函数的功能
1. 可以惰性求值
2. 可以提前传递部分参数

### Thunk 函数

> Thunk 函数其实就是多次柯里化函数的一个子集，只不过他多了一个要求：最后一次调用只接受回调函数作为唯一的参数，调用它将返回一个 thunkedFunction。

所以 Thunk 函数 也具有柯里化函数的功能

1. 可以惰性求值
2. 可以提前传递部分参数

Thunk 函数、co 和 async 我在另一篇文章具体介绍了，有兴趣看这里：

## 回到问题的源头
当初我就是看下面这段代码产生了迷惑，我搜索的时候还在这个 [github issue](https://github.com/thunks/thunks/issues/1)  看到了关于 thunk 和  promise **处理异步**的讨论，知道了 **node 那边 thunk 用的非常多，也用的很久了，浏览器端用的更多的则是 promise。**

并且看到了和我一样的，在学习研究 redux 时碰到 redux-thunk 然后研究探寻 找到了这个 2014 年(那个时候自己才刚刚开始学编程...)的帖子，。

![](http://7xkpdt.com1.z0.glb.clouddn.com/61a686968eda175cfc8a448d45efdd37.png)

知道了柯里化和 Thunk 后，我们再来看 redux-thunk 的十几行源码，其实已经无比清晰了。

无非就是 return 一个 **多次柯里化 的函数**，其中 action 不仅仅可以是 redux 的 action 对象了，还可以是一个(回调)函数。

![](http://7xkpdt.com1.z0.glb.clouddn.com/ff4e407148a6e45da5da0b440a7e01d9.png)


### redux-thunk 的功能
这时我们就可以将多个有关联的异步 action 合并在上面这个(回调)函数里，这个函数其实就是 redux 官方推荐的异步 action creator 返回的，我把它称之为 **异步 action 函数**。

借用官方文档的例子：

```js
import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

// 来看一下我们写的第一个 thunk action creator！
// 虽然内部操作不同，你可以像其它 action creator 一样使用它：
// store.dispatch(fetchPosts('reactjs'))

export function fetchPosts(subreddit) {

    // Thunk middleware 知道如何处理函数。
    // 这里把 dispatch 方法通过参数的形式传给函数，
    // 以此来让它自己也能 dispatch action。

    return function (dispatch, getState) {

        // 首次 dispatch：更新应用的 state 来通知
        // API 请求发起了。

        dispatch(requestPosts(subreddit))

        // thunk middleware 调用的函数可以有返回值，
        // 它会被当作 dispatch 方法的返回值传递。

        // 这个案例中，我们返回一个等待处理的 promise。
        // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。

        return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
            .then(response => response.json())
            .then(json =>

                // 可以多次 dispatch！
                // 这里，使用 API 请求结果来更新应用的 state。

                dispatch(receivePosts(subreddit, json))
            )

            // 在实际应用中，还需要
            // 捕获网络请求的异常。
    }
}
```

## 关于这段代码的问题
> 这是我自己产生过的俩问题

### 问题1： redux 异步请求为什么要写在 action 里
我一开始学 redux 时就犯了这个错误。将异步请求写到 reducer 里去了，因为我开发时忘记了一句话。

> **reducer 应该是 pure function**

而异步请求是有副作用的。官方文档给出了正确的姿势，使用异步 action creator。

### 问题2： redux 的 异步 action 为什么需要 thunk

#### 简单使用方法
发起异步 API 时，有两个非常关键的时刻：发起请求的时刻，和接收到响应的时刻。

所以至少需要三个 action:
1. 一个通知 reducer **请求开始** 的 action
2. 一个通知 reducer **请求成功结束** 的 action。
3. 一个通知 reducer **请求失败** 的 action。


我们可以定义一个函数来 分别 dispatch 这 3 个 action，然后调用这个函数，这是最简单的方法，这时候完全不需要 redux-thunk 。

这种方法下，代码长这样
```js
// actions.js
function requestPosts(subreddit) {
    return { type: 'REQUEST_POSTS', subreddit }
}
function receivePosts(subreddit, json) {
    return { type: 'RECEIVE_POSTS', id }
}

export function fetchPosts(dispatch, text) {
    dispatch(requestPosts(subreddit))

    fetch(`http://www.subreddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(json =>
            dispatch(receivePosts(subreddit, json))
        )
}
```

当你的应用很小的时候完全可以这样。

但当应用大的时候，尤其是组件层数超过3层甚至更多的时候，我们推荐下面这种方法。


#### 使用异步 action creator
因为 redux 作者考虑到了:

当我们在 react 中使用 redux 的时候，经常会出现像下面代码这样的情况。

> 不想让子组件觉察到 Redux 的存在，而且不希望把 Redux 的 store 对象或 dispatch、getState 方法传给它。


```js
import * as todoActionCreators from './todoActionCreators'
import { bindActionCreators } from 'redux'

import React, { Component } from 'react'

class TodoApp extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <TodoList
                todoActions={todoActions}
                todos={todos} />
        )
    }
}

function mapStateToProps(state) {
    return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
    return {
        todoActions: bindActionCreators(todoActionCreators, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```


注意这里：**当你需要把 action creator 给一个子组件上，却不想让子组件觉察到 Redux 的存在。**

所以呢，子组件是看不到 `store` 这个概念的，那么 `store` 的 `dispatch`、`getState` 方法 都不应该传递给子组件。

我们在下面看看之前的 简单方式实现 的代码，它的实现 肯定需要 `dispatch`、还可能需要 `getState`

```js

export function fetchPosts(dispatch, text) {
    dispatch(requestPosts(subreddit))

    fetch(`http://www.subreddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(json =>
            dispatch(receivePosts(subreddit, json))
        )
}
```

子组件是看不到 `dispatch` 的，那么 `dispatch` 哪里来？

redux-thunk 运用了柯里化的一个功能：**提前传递部分参数**。在创建 store 后，就去使用 redux-thunk 将 `dispatch` 函数 存到了下面这个(createThunkMiddleware)函数的闭包里面，当 异步 action 函数 被触发的时候，就会将 `dispatch` 等传给它。

![](http://7xkpdt.com1.z0.glb.clouddn.com/ff4e407148a6e45da5da0b440a7e01d9.png)

我对 redux 作者对 redux-thunk 的功能解释（stackoverflow 上的一个回答） 的总结
1. 我们想要抽象出来一个 异步(合体了的)ActionCreator，我们需要 dispatch。
2. 但我们使用 react-redux 时，在深层次组件是没有对 dispatch 和 store 的引用的。
3. 这个时候 redux-thunk 就非常有用了，有了它，我们就把 dispatch 的引用存在了高阶函数里。

所以有了 redux-thunk，知道了它背后的思想和原理，我们就可以轻松的向子组件传递 异步 action 函数了，并且遵守了 redux 一个潜在的思想：

> 只有容器组件看得到 redux，子组件是被容器组件隔离了的，是看不到 redux 的。
