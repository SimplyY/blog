# 写 reducer 测试 的秘诀
## 前言
- 适合人群： 对 测试有一定了解，对 redux 使用非常熟悉的人
- 我最近写了 27 个 react-native 上对 reducer 的单元测试，这里我总结一下我发现的套路，也可以称之为秘诀。

## redux 官方测试文档
https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md#reducers

## 关于测试
如果有兴趣把 redux 官方测试文档 看了一遍的（&&测试写的不多的）人会发现，自己还是不大清楚到底测试究竟是怎么一回事。

### 关于 Mock
我们先看看一个最简单的测试

```js
funcion A(a, b) {
  return a + b
}

// 基于前端各类测试框架，大概会写成这样
it('A(a, b) function: should return a + b', () => {
  expect(A(1, 2)).toEqual(3)
})
```

#### 抽象一下
首先简单的写测试，这么写完全不虚，但是当情况复杂起来就不是这样了，我们得抽象一下，**让复杂情况下写测试也和简单情况一样简单**。

首先谈一下 Mock，如上图，我们一般如果对 A 函数（或其他）进行单元测试的时候，A 函数有时候会依赖 a、b 等值，我把这个称之为 值依赖。

这个很容易皆可以解决，本地 mock 一些数据即可，比如上面的 1 和 2。

**mock 是测试的基础**。我们通过 mock 运行 A 的函数后，再做一个 断言，形如：

```js
expect(realValue).isEqueal(expectedValue)
```

### 基于 Mock 的语义版 reducer 测试模板

```js
it('add(number) action: should make state.value add number', () => {
  const mockOldState = {
    value: 0,
    name: 'test'
  }
  const testAction = add(2)
  const expectedNewState = {
    value: 2,
    name: 'test'
  }

  const realNewState = reducer(mockOldState, testAction)
  expect(realNewState).toEqual(expectedNewState)
})
```

上面其实是一个模板，包括三部分：
1. 测试描述
2. mock
3. 断言测试

三部分具体怎么写：

1. 写测试描述：
  ```js
  'add(number) action: should ?' = actionCreate 的函数签名 + 'action: should' + 这个 action 应该能干啥
  ```
2. mock：
  - 考虑 dispatch 当前测试的 action，前后的 state 的情况 mock：
    1. `mockOldState`
    2. `testAction`
    3. `expectedNewState`。
  - （注意：对于复杂数据的 mock，比如上面的测试 的demo， 可以通过 RN debug 的基于行为触发的 action 时 chrome 控制台会打印出 oldState，action，newState，可以基于此来 mock，切记自己也要对 mock 的数据核查一下）
3. 断言测试：
  1. 运行 `reducer(mockOldState, testAction)` 得到 `realNewState`
  2. 通过断言 `expect(realState).toEqual(expectedState)` 来测试。
