### 简化 redux api


### Logger for Redux

![](http://7xkpdt.com1.z0.glb.clouddn.com/9fec3e13cb3f1fc9282fc0547d170e7a.png)

![](http://7xkpdt.com1.z0.glb.clouddn.com/d7e45fe7d0ffd4b56603f4c87d117859.png)https://camo.githubusercontent.com/09b14c0680705ad6ea3b0fed1c3624b66fe020cc/687474703a2f2f692e696d6775722e636f6d2f704d52334f41762e706e67


### redux-thunk

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


(1) redux 异步请求为什么要写在 action 里
(2) redux 的 异步 action 为什么需要 thunk

如果不懂看这里

TODO url


### immutable
// TODO
