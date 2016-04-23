# 简化 redux 的 api

犹记得阿里终面的时候，和面试官说起 `redux`，我当时说了好几句 `redux` 写起来真麻烦。。

今天逛 github 发现了一个 `redux` 小工具 `redux-actions`，github： https://github.com/acdlite/redux-actions

它提供俩 api，非常有用，能减少我们写 `reducer` 和 `actionCreater` 函数至少一半代码量，让我们通过这俩，来简化 redux 的 api 吧。

## createAction
api： ![](http://7xkpdt.com1.z0.glb.clouddn.com/7a794cce4de907fc9e1f80cc67553c8c.png)

下图这是 `createAction` 的效果(我把我博客的 `actions` refactor 一下，前后对比。)

![](http://7xkpdt.com1.z0.glb.clouddn.com/d4f31ccdbbeb269d0a345f25c9b5bc70.png)
￼￼
原理就是高阶函数， `createAction` 返回一个函数，它的内部实现 在这里

![](http://7xkpdt.com1.z0.glb.clouddn.com/6b5dc66c0409e71e9213be9aa95e01bd.png)

这个函数的关键就是返回一个 我们原来要写的 `actionCreater` 函数，我们调用 `createAction` 传三个参数， 以此 `createAction` 就可以构建一个灵活性特别高的 `actionCreater` 并返回给我们。

其中主要就是对 error 的判断，和 metaCreater，这俩很灵活（虽然我 refacoter 我博客的时候，发现用不上）


￼实现的原理就是，我们原来每次在写的 `actionCreater`，其实有不少重复工作， `createAction` 把其进一步抽象了一下，大部分时候一行代码就可以解决这个问题了。

## handleActions

￼它的 example

![](http://7xkpdt.com1.z0.glb.clouddn.com/e5f3c0c8d4027a1e32e160afb7086ed6.png)


我之前用上了 `{ createReducer } from 'redux-immutablejs' ` 如图，感觉 `createReducer` 和 `handleActions`  效果差不多，都是将原来笨重的 switch 改写，于是我就没有再 refactor 了，还是沿用之前的 `createReducer` 。

![](http://7xkpdt.com1.z0.glb.clouddn.com/be6576712ccecc1410ee06d428eb13ae.png)
