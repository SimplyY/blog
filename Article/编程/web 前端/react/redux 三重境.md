# redux 三重境

---
## 王国维的《人间词话》的三重境

古今之成大事业、大学问者，必经过三种之境界。

- “昨夜西风凋碧树，独上高楼，望尽天涯路”，此第一境也；
- “衣带渐宽终不悔，为伊消得人憔悴”，此第二境也；
- “众里寻他千百度，蓦然回首，那人却在灯火阑珊处。”，此第三境也。

---

![](http://7xkpdt.com1.z0.glb.clouddn.com/4e687a6a6f19bd33ed20840764b6e382.png)

我还在第二重。

---

## 大纲
1. redux 基础知识和 react-redux
2. redux 周边生态探索
    - 有哪些功能？（粗略介绍）
    - 有哪些很不错的第三方库？（详细介绍）
3. 最佳实践介绍（dva）

---


## redux 基础知识和 react-redux
1. 三个基本原则
2. 数据流
3. 在 React 应用中使用 Redux（react-redux）

---
### redux 三个基本原则
1. 整个应用只有唯一一个 Store 实例
2. State 只能通过触发 Action 来更改
3. **State 的更改** 必须写成纯函数(Reducer)，`(oldState, action) => newState`，也就是每次更改总是返回一个新的 State


### redux 两个显著的特点
1. 可预测性（Reducer 是纯函数）。
2. 扩展性强（middleware）。

---
### 单向数据流
![](http://7xkpdt.com1.z0.glb.clouddn.com/5ae37a6852af6bc4868073a00a411781.png)


1. Actions 是 `store.dispatch(action)`，它是每次数据改变的源头。
2. 如果有 middleware 将先进入 middleware
3. Reducer 管理 state, 也就是 `(oldState, action) => newState` 的集合。
4. 当 state 改变后, View Provide 就会更改视图


---
## 连接 React (react-redux)
1. 使用 `Provider` 在根组件 注入 Store
2. 容器组件使用 `connect()` 方法连接 Redux


![](http://7xkpdt.com1.z0.glb.clouddn.com/0d876375424be667c2e439d839d94f9d.png)

---
### 1. 使用 `Provider` 在根组件 注入 Store

![](http://7xkpdt.com1.z0.glb.clouddn.com/82ea02513529e43f7deff3f1089e3ee8.png)

---
### 2. 容器组件使用 `connect()` 方法连接 Redux


#### 那么我们如何获取容器组件的依赖呢？

容器组件及其子组件需要的两个能力：
1. 读数据：获取 redux 的 state
2. 改数据：向 redux dispatch actions


---
#### 使用步骤1

![](http://7xkpdt.com1.z0.glb.clouddn.com/63851225b84f2d7c1d864c031bf040d5.png)

1. `mapStateToProps`：从 store 的 state 里把容器组件依赖的部分 state 取出来，成为组件的 props。
2. `mapDispatchToProps`： 将特定的 dispatch 函数取出来变为 props 。


注： `bindActionCreators` 将 ActionCreator 和 store 的 dispatch 绑定到一起，返回一个特定的 dispatch 函数，组件调用即可触发 `store.dispatch(action)`

---
#### 使用步骤2

在 render 等函数里面 取出相应 props，自己使用或者传给子组件

![](http://7xkpdt.com1.z0.glb.clouddn.com/bc4e84649fcd2dfb60cf4586cea79936.png)


---
### 分离容器组件和展示组件

redux 的重要思想：分离容器组件和展示组件。

![](http://7xkpdt.com1.z0.glb.clouddn.com/c8c7e99a7efc423797d188f05414a90b.png)


#### 容器组件
在应用中，只有 **最顶层组件是对 Redux 可知**。

#### 展示组件
应该是“笨拙”的，是通过父组件传递的 `props` 来获取数据和更改数据的 dispatch，它是感知不到 redux 存在的，具有很强的复用性。


---

### 如何分辨容器组件和展示组件的思考
#### 1. 状态
- 容器组件维护多个状态
- 展示组件维护极少的状态(一般是 ui 状态)

#### 2. ui
- 容器组件无关 ui，几乎没有 css 样式、html 标签，通过组合展示组件来构造容器组件
- 展示组件 ui 强相关,大量 css 和 html 标签


---
#### 容器组件示例（ArticleBox 组件）：

![](http://7xkpdt.com1.z0.glb.clouddn.com/f0e0750048b21576e43141a030a52e4f.png)

---
#### 展示组件示例（Article 组件）：
![](http://7xkpdt.com1.z0.glb.clouddn.com/c0efcc773c39780347666ca5d2faf62b.png)

---
### 容器组件和展示组件
![](http://7xkpdt.com1.z0.glb.clouddn.com/34a99e4e9c99d053e8102ef0981ab709.png)


---

![](http://7xkpdt.com1.z0.glb.clouddn.com/4e687a6a6f19bd33ed20840764b6e382.png)

---


## 分享进入第二部分

- 探索 redux 生态
    - 有哪些功能？（粗略介绍）
    - 有哪些很不错的第三方库？（详细介绍）
- 最佳实践介绍（dva）

---

## redux 生态
- 连接到其他库
- 开发(debug)工具
- 各类实用工具
    - 简化 api
    - 计算、处理数据
    - 异步 action

---

## 连接到其他库
- react-redux
- react-router-redux
- redux-immutablejs


---
## 实用工具
- [redux-thunk](https://github.com/gaearon/redux-thunk) — 用最简单的方式书写异步 action creator
- [redux-actions](https://github.com/acdlite/redux-actions) — 在初始化 reducer 和 action 构造器时减少样板代码
- [Reselect](https://github.com/reactjs/reselect) Data => View store 的 select 方案，用于提取数据的筛选逻辑。
- 等等


---
## 开发测试工具
#### devtool
redux-devtools — 一个使用时间旅行 UI 、热加载和 reducer 错误处理器的 action 日志工具

![](https://camo.githubusercontent.com/cc9b9701f3984f3b8cfb6264c214217b0451df09/687474703a2f2f692e696d6775722e636f6d2f51624e7a4e57342e676966)

DevTools accepts monitor components(Custom Monitors)

---

### Redux Logger
- redux-logger — 记录所有 Redux action 和下一次 state 的日志


![](http://7xkpdt.com1.z0.glb.clouddn.com/d7e45fe7d0ffd4b56603f4c87d117859.png)

---
### devtool
- redux-devtools — 一个使用时间旅行 UI 、热加载和 reducer 错误处理器的 action 日志工具

![](https://camo.githubusercontent.com/cc9b9701f3984f3b8cfb6264c214217b0451df09/687474703a2f2f692e696d6775722e636f6d2f51624e7a4e57342e676966)

---
## 不错的第三方库
我这里就介绍两个第三方库

- redux-action
- redux-thunk

更详细的看我在 ata 上写了两篇文章
1. redux Middleware 介绍及源码研究 http://www.atatech.org/articles/57528
2. redux-thunk 学习记录  http://www.atatech.org/articles/57503

---

## 简化 redux api
[redux-actions](https://github.com/acdlite/redux-actions) — 在初始化 reducer 和 action 构造器时减少样板代码

#### createAction

下图这是 `createAction` 的效果 (我把我博客的 `actions` refactor 一下，上面是简化后。)

![](http://7xkpdt.com1.z0.glb.clouddn.com/11f536336a3f2eae7e3aaad425ecb863.png)
￼￼

---

### 内部实现
原理就是高阶函数， `createAction` 返回一个函数，


![](http://7xkpdt.com1.z0.glb.clouddn.com/6b5dc66c0409e71e9213be9aa95e01bd.png)

---

## redux-thunk
用最简单的方式书写异步 action creator, 官方文档的例子：
![](http://7xkpdt.com1.z0.glb.clouddn.com/01edd75e2dd7d1122e084e98383776a0.png)


---
## 关于这段代码的两个疑问和思考
我产生的两个疑问

1. 异步请求为什么要写在 action 里？
2. 异步 action 为什么需要 thunk？


---
### 1. redux 异步请求为什么要写在 action 里?
我初学 redux 时就犯了一个错误——将异步请求写到 reducer 里去了。但是

> **reducer 应该是 pure function**

而异步请求是有副作用的。

---
### 2. redux 的 异步 action 为什么需要 thunk?

### 简单方法
发起异步 API 时，有两个非常关键的时刻：发起请求的时刻，和接收到响应的时刻。

所以至少需要三个 action:
1. 通知 reducer **请求开始** 的 action
2. 通知 reducer **请求成功结束** 的 action。
3. 通知 reducer **请求失败** 的 action。


我们可以定义一个函数来 分别 dispatch 这 3 个 action，然后调用这个函数，这是最简单的方法，这时候完全不需要 redux-thunk 。

---
### 简单方法的缺陷

![](http://7xkpdt.com1.z0.glb.clouddn.com/5920a5479f06d557d95fa7e48bf5c2fc.png)

当你的应用很小的时候完全可以这样。

但当应用大的时候，尤其是组件层数超过3层甚至更多的时候，我们推荐使用 redux-thunk，因为 **子组件应该觉察不到 Redux 的存在**，子组件不应该拿到 dispatch 的引用。

使用 redux-thunk 则可以在 middleware 里，将 dispatch 等 redux 的变量存起来，action 发起时，将其传进去。

---

![](http://7xkpdt.com1.z0.glb.clouddn.com/4e687a6a6f19bd33ed20840764b6e382.png)

---
## dva 介绍

> google dva...第一个结果

![](http://7xkpdt.com1.z0.glb.clouddn.com/0eb282a6f73b8340574deb535866dd9a.png)

---

### dva 框架

实际上 dva 是基于现有应用架构 (redux + react-router + redux-saga 等)的一层轻量封装，没有引入任何新概念，全部代码不到 100 行。

由支付宝前端团队开发。

#### 他们总结的 React + Redux 最佳实践
![](http://7xkpdt.com1.z0.glb.clouddn.com/ef7fb40d30f6475bf8c018d409d2866e.png)


---
### dva 的由来

- [React + Redux 最佳实践](https://github.com/sorrycc/blog/issues/1) (dva 基于此封装)
- [支付宝前端应用架构的发展和选择: 从 roof 到 redux 再到 dva](https://github.com/sorrycc/blog/issues/6)

### dva 开发阶段
目前还在开发中，api 等还不稳定，不过按这套思路继续做下去，它很有可能成为最佳实践。

api 风格方面非常像 vue，并且沿袭了 vue 的简单易上手、api 简洁的特点。


---
### dva 使用

![](http://7xkpdt.com1.z0.glb.clouddn.com/e656a71e51d79eaac844c543570b6422.png)

---

## 关于 dva 的思考
### react redux
![](http://7xkpdt.com1.z0.glb.clouddn.com/eb68669a65b9fdccf313ca63add1627d.png)

react redux 的思想从一开始就是 **开放的**，海纳百川，官方给出的最佳实践是 **组合式** 的，根据需求、喜好的不同，会有十几种最佳实践。。。。

- 优点：社区异常活跃；扩展性强、非常灵活；中台 dpl 基于 React。
- 缺点：学习成本高，新手上手慢；太灵活，周边生态百花齐放，如果没有一定的约束，非常不易于团队合作。

---
### vue

![](http://7xkpdt.com1.z0.glb.clouddn.com/239ae002ff52895c5993624681089b98.png)

去年开始 vue 以上手容易、api 简洁优雅出名，对于同类需求，官方给出的最佳实践几乎是唯一的。

- 优点：学习成本低，易上手；最佳实践统一，利于团队合作；作者非常给力，在 vue2.0 里，发布了很多特别棒的新 feature（jsx,virtual dom，服务器流式渲染); weex 扩展了 vue 在移动端的能力。
- 缺点：社区活跃低于 React；扩展性、灵活性差。

---
### dva
dva 结合了 react 和 vue 两者的优点

- 学习成本低，易上手
- 最佳实践统一，利于团队合作
- 社区异常活跃，扩展性强
- 中台 dpl 基于 React

缺点：
- 还处于开发中期，api 不是非常稳定
- 降低了 redux 的扩展性、灵活性

---
### 对 dva 的态度
1. 学习借鉴
    - 学习思想，借鉴他们的最佳实践; 持续跟进
2. 使用？ or 自己造轮子？
    - 使用： 当其比较成熟时，对于复杂页面(尤其是单页应用)可以考虑使用。
    - or 自己造轮子： 借鉴学习其的特点和功能自己造轮子

总之努力争取攀登到第三重境

---

![](http://7xkpdt.com1.z0.glb.clouddn.com/4e687a6a6f19bd33ed20840764b6e382.png)
