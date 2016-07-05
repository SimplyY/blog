# redux Middleware 介绍及源码研究

redux Middleware 学习资料(redux 文档相关章节 ) : http://cn.redux.js.org/docs/advanced/Middleware.html

我这里引用少数 redux 文档上面的内容来介绍，并结合源码研究内部运行原理。

## Middleware 介绍
### backend Middleware
如果你使用过 Express 或者 Koa 等服务端框架, 那么应该对 middleware 的概念不会陌生。 在这类框架中，middleware 是指可以被嵌入在框架接收请求到产生响应过程之中的代码。

例如，Express 或者 Koa 的 middleware 可以完成添加 CORS headers、记录日志、内容压缩等工作。middleware 最优秀的特性就是可以被链式组合。你可以在一个项目中使用多个独立的第三方 middleware。

### redux Middleware
Redux middleware 提供的是 **位于 action 被发起之后，到达 reducer 之前的扩展点。**
![](http://7xkpdt.com1.z0.glb.clouddn.com/56c25f2b631971f79cee68d321c026c3.png)

你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。


## 实例理解：使用 Middleware 来记录日志
使用 Redux 的一个益处就是它让 state 的变化过程变的可预知和透明。

试想一下，当我们的应用中每一个 action 被发起以及每次新的 state 被计算完成时都将它们记录下来，岂不是很好？当程序出现问题时，我们可以通过查阅日志找出是哪个 action 导致了 state 不正确。

![](http://7xkpdt.com1.z0.glb.clouddn.com/b763ae7c007dd01b22e93e245b286a1c.png)

### 调用 Middleware 的方式
```js
let store = createStore(
    todos, // reducer
    [ 'Use Redux' ], // initialState
    applyMiddleware(logger, thunk) // enhancer
)
```

如果仅仅是使用，就这么简单，再看看相应 Middleware README 里写的功能和使用方式即可。

但 Middleware 内部到底干了什么呢？知道了内部原理，有助于我们更加清晰的理解 Middleware 的功能，也可以自己写 Middleware。

## Middleware 内部原理
### Logger Middleware 的简单实现
```js
const logger = ({ dispatch, getState }) => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}
```
#### 代码含义
我们可以看到 Middleware 需要三层参数。

1. Store 的 dispatch 和 getState
2. next 参数
3. action

> 其中 next 参数为下一个 middleware 的最内层函数，如果本身是最后一个 middleware 则 next 会是 store 的 dispatch 函数。用来将 middleware 串起来

#### 柯里化函数

它其实就是一个柯里化函数，我这里简单介绍一下它的特点：
1. 需要多次调用传递参数
2. 最后一次调用才会调用最内层函数

比如
```js
let test = a => b => c => {xxx}
```

比如对于上面的 `test` 函数，它有 3 个箭头， 这个函数要被调用 3 次 `test(a)(b)(c)`，前两次调用只是在传递参数，只有最后依次调用才会返回 `{xxx}` 代码段的返回值，并且在 `{xxx}` 代码段中可以调用 a,b,c

如何还是不清楚箭头函数和 柯里化 的关系，看这里：http://simplyy.space/article/5779b5fd3b89a1592c015e9b


那么这些 middleware 在 redux 中的使用原理是怎么样的呢？



### 整体思路
我们先回顾一下之前代码。
```js
let store = createStore(
    todos, // reducer
    [ 'Use Redux' ], // initialState
    applyMiddleware(logger, thunk) // enhancer
)
```

```js
const logger = ({ dispatch, getState }) => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}
```

其中 **applyMiddleware** 进行所有 Middleware 的初始化： 将 logger 等所有 Middleware (串起来)包装 store 的原 dispatch 方法(并替换掉)，这样以来，你再调用 dispatch(action) 将触发一系列 Middleware。

为了实现上面的内容，就需要俩方面内容：
1. **createStore** 获取所需的 store，从而获取 middleware 需要的第一层参数 ({ dispatch, getState })。
2. **中间件的连接 next**: 通过 middleware 柯里化函数的第二层参数 next 来实现。非最后一个 middleware 会调用下一个 middleware 的最内层函数作为 next 参数，调用链中最后一个 middleware 会接受真实的 store 的 dispatch 方法作为 next 参数

> dispatch(action) 则传入了 第三层参数

我们来具体看看这些思路的源码实现

### applyMiddleware 源码
```js
import compose from './compose'
export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, preloadedState, enhancer) => {
        // 创建 store
        var store = createStore(reducer, preloadedState, enhancer)
        var dispatch = store.dispatch
        var chain = []

        // 这几行将参数传给了logger 等 Middleware。
        // 其中要注意的是，middleware 是柯里化函数，它会将 middlewareAPI 的变量存在闭包里面。
        var middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        }
        chain = middlewares.map(middleware => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)

        // 返回值用来替换 dispatch
        return {
            ...store,
            dispatch
        }
    }
}
```

####  使用 enhancer 替换 dispatch
这里看到 `applyMiddleware` 返回的函数可能有些疑惑 `(reducer, preloadedState, enhancer)` 里的 `enhancer` 这是个啥。

> `enhancer` 就是 `applyMiddleware` 的返回的那个函数。

在后面要讲的 `createStore` 函数内部里，假如 `enhancer` 不为空，则`createStore` 函数的返回值为 `enhancer` 函数返回的 store（这样就可以用被 `middlewares` 封装了后的 `dispatch` ，将原来的 `dispatch` 替换掉了）


#### 传入第一层参数({ dispatch, getState })
```js
var middlewareAPI = {
    getState: store.getState,
    dispatch: (action) => dispatch(action)
}
chain = middlewares.map(middleware => middleware(middlewareAPI))
```
注意 return 的函数的签名 `(createStore)` ，实际上这段代码返回一个（需要 createStore 的） 函数。返回的函数通过调用 createStore 返回的 store，获取了 middleware 需要的参数，并批量将全部的 Middleware 需要的第一层参数({ dispatch, getState })传进去了。


#### 将 middlewares 串起来
```js
dispatch = compose(...chain)(store.dispatch)
```
compose 函数里将 middlewares 串了起来，compose 内部会传入第二层参数 next(next 为下一个 middleware的最内层函数，最后一个 middleware 的 next 是 store.dispatch)


我们再看看 applyMiddleware 的函数签名
```js
export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, preloadedState, enhancer) => {
```

#### 疑问：createStore 哪来的呢？

我们来看看 redux 中 createStore 源码

### redux 中 createStore 源码
`createStore` 中，跟 `applyMiddleware(logger, thunk)` 返回的 `enhancer` 有关系的源码

```js
export default function createStore(reducer, preloadedState, enhancer) {
    // ... some code about params check

    if (typeof enhancer !== 'undefined') {
        // ... some code about params check
        return enhancer(createStore)(reducer, preloadedState)
    }

    // ... 此处省略 createStore 中 和中间件无关的一百多行代码，大概有这几方面代码：reducer、getState、subscribe、dispatch、observable 这些 store 的对外的接口和内部处理方法。
}
```

我们注意源码中的这一行代码
```js
return enhancer(createStore)(reducer, preloadedState)
```

这就是柯里化函数的调用过程，它将之前 `applyMiddleware` 需要的 `createStore` 传了进去。然后返回 `enhancer` 中生成的 `store` 。（这样就可以用被 `middlewares` 封装了后的 `dispatch` ，将原来的 `dispatch` 替换掉了）

再回过头来看 `applyMiddleware` 和 `createStore` 的核心代码是不是瞬间就清晰很多了

```js
export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, preloadedState, enhancer) => {
        // some code
        var store = createStore(reducer, preloadedState, enhancer)

        chain = middlewares.map(middleware => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)

        return {
            ...store,
            dispatch
        }
    }
}
```

```js
let store = createStore(
    todos, // reducer
    [ 'Use Redux' ], // initialState
    applyMiddleware(logger, thunk) // enhancer
)
```

### 小节
当完成了
1. 传入第一层参数({ dispatch, getState })
2. 将 middlewares 串起来
3. 用被 `middlewares` 封装了后的 `dispatch` ，将原来的 `dispatch` 替换掉

整个 middleware 在 redux 中的使用原理就被实现了。

考验我们的时候到了，我们来看看 最常用的 Middleware 之一 redux-thunk 的 源码。

## redux-thunk 源码

```js
function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }

        return next(action)
    };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

redux-thunk 源码中所做的事和其他的中间件有些不同，它有时并不会 执行 next。

它主要解决了，**在 redux 中如何写 异步 action** 的问题。

当它是发现 action 是一个函数的话，就去调用这个函数(这个函数内部会异步 dispatch 新的 action)，而不用再去调用 next 了，因为action 是一个函数时， action 函数实际上是是一系列 action 的封装，并不是真实的某个 action。

关于 redux-thunk 的使用和研究具体看我这篇文章：
SimplyY 的博客文章: 《redux-thunk 学习过程》	链接为： http://simplyy.space/article/57712d781c22961d350eb06e
