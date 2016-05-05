# 小记 react server render

## 注意的地方
虽说同构可以重复利用大量代码，使得前后端渲染共用一套代码，但是还是有不少区别和要注意的地方。（我这里没写具体细节，主要参考后面的资料链接，他们对细节的操作写的很详细，我这里主要写的是一些非常值得注意的地方，他们可能没写的地方）

0. **后端调用 es6 代码**：我使用的方案是 `require('babel-core/register')`，这个会有点坑，是 babel 翻译的问题，当你在 node 环境下 `require` es6 的 `export`，比方说：
```js
var routes = require('../../front-end/src/routes.jsx').default
```
恩，要加 `default`，我们 `import` 明明是写成 `import routes from routes`,`require`就得写成这样。因为 babel 把 `export default ` 翻译成了，`module.default`。
1. **渲染页面所需要的数据**：如果 react 前端渲染里，一般是用 ajax 拉数据库数据来渲染页面，改成 react 服务器端渲染，渲染页面的数据就不能是通过 ajax 来获取了。我是在后端渲染页面之前，通过数据库读写来获取数据。后面资料的方式 是用组件的 `fetchData` 的静态方法，
2. **必要的运行环境判断**：当我们的 react 组件里调用了 BOM 的地方（尤其要注意 react router 使用到了的 history api，比如创建 store 的地方），都需要对运行环境判断，然后 专门写 node 下应该的行为。
我写的 isNodeEnv():
```js
export function isNodeEnv() {
    return typeof window === 'undefined' && typeof process === 'object'
}
```
3. **redux 的 store 从后端传给前端**： redux 的 store 在服务器端初始化，并会 dispatch 一些必要的 action（这个得根据路由），然后将 store 放到 script 标签里，前端页面将这个 store 拿到(serverState)，并以此为 initialState 来生成新的 store
```js
const serverState = window.__INITIAL_STATE__
let store = configureStore(serverState)
```
4. **渲染模板**:我之前用的是 redux 文档里的 es6 模板字符串 来写 `renderFullPage` 函数，后来我改成了把模板写到文件里面，我用的是文件读写，性能提升了不少，第一篇资料里面用的是ejs模板，原理估计和我的类似，性能上会比 es6 模板字符串函数好，因为 n 个高并发的时候， `renderFullPage` 函数会被调用 n 次，es6模板字符串未能缓存下来。
5. **webpack 打包到 js 里的 css 会出现闪屏**: 服务器端渲染返回的 html，一定要在 head 部分或者标签里加载 css，而不要 webpack 打包 css 在 js 里面（会有闪屏）（如果你之前的方案不是用 webpack 将 css 打包到 js 里面，这部分可以跳过。）所以，如果服务器端渲染出来的 html 出现闪屏，原来的前端 react css 加载方案就得改了。原来的webpack 将 css 打包到 js 的方案不会，因为原来的页面内容是用 ajax 获取 js 生成的（所以 css 会在内容生成前被 js 插入到 head）。

    改的方式主要取决于原来的 css，是在组件内部的，还是组件外部，我是在组件外部的，所以写了个 gulp 的 task，将 css 插入到 head 部分（因为我没有用到 css 库，所以实际传输不到2kb，我之前是使用 link 标签，但是加载它，严重影响了首屏显示的性能，可能我的服务器问题吧，cpu 飙升导致？，所以我就用 style 标签插入到 head 里面了），或者生成一个 xx.css文件，用 link 标签引用。

## 性能方面和 debug
1. 一个是后端调用 es6 代码: 由于需要使用 babel-core/register，启动服务器 node 程序会卡几秒，然后后端方面 debug 由于它就直接几乎卡死，于是我后端 debug 就是用的 log，，
2. react 的 renderToString 函数: 比较耗性能，特别是cpu，但是由于路由情况比较多，不好做缓存，所以我这边就按文档来的，这块性能是可以优化的。
3. 高并发：我这边用命令行工具 `ab` 做性能测试，服务器并发数到了50，服务器就有点卡，cpu 50%以上，返回页面的时间就比较慢了，并发数最多就100，再高估计就很卡很卡了。


### 总结
性能优化方面，缓存等还有很多地方都可以优化，主要就是 cpu 方面，会飙升。我对于服务器 端性能优化经验太少，下手地方少。

然后我博客对性能要求实际上不高，因为是 spa 的，所以只有客户端首次访问，才会请求服务端，其他页面都不需要后端来渲染页面，所以并发数很难超过10（我博客平均访问量不超过100）。介于此，我就没继续服务器优化方面深挖，而是去解决博客代码方面的 bug 去了，讲实话除了我上面列举出来的，还有些奇怪的 bug，最后我的解决方式也是非常的不优雅。


不过，在保证后端渲染和前端渲染的 checksum 一致后，前端方面的性能是大大提升了，timeline 里面的首屏 **显示** 只要500ms-700ms，只是后端性能简直不堪一击。。
![](http://7xkpdt.com1.z0.glb.clouddn.com/dde0e95fc8068669376c881b359e09d0.png)


## 资料

1. react-router doc: http://react-guide.github.io/react-router-cn/docs/guides/advanced/ServerRendering.html
2. redux doc: http://redux.js.org/docs/recipes/ServerRendering.html
3. React同构实践：http://www.stuq.org/courseware/987/1194
