# web前端 thinking 教程(0)：序

## 教学提纲
### 基础
- 编程基础
    - 你有多喜欢编程
    - 你平均每天在编程上花多少时间
    - 除了看书、写代码，你的思考有多少
- js 语法基础
    - string、array 常用方法
    - 闭包
    - this
    - 原型链
    - 继承
    - js 事件队列
- dom 基础
    - DOM 增删改查
    - DOM 事件机制
- css 基础
- git 基础
- web 性能优化基础
    - 看书了解原理:[《高性能网站建设指南》](http://book.douban.com/subject/3132277/)
    - 请求数量: 合并脚本和样式表, iconfont，拆分初始化负载，划分主域
    - 请求带宽: 开启 GZip，精简 JavaScript，移除重复脚本，图像优化
    - 缓存利用: 使用 CDN，使用外部 JavaScript 和 CSS，减少 DNS 查找
    - 页面结构: 将样式表(影响样式的内容)放在顶部，将脚本放在底部，尽早刷新文档的输出

### 实战
#### 纯前端项目
- 使用 DOM 写简版的搜索栏（功能和百度谷歌类似）
- 模仿前端渲染框架工作原理（比如模仿 react）写个简版 TODO(可以选择使用 jquery)
- 使用 react 写个简版 TODO
- 使用 react react-router redux 写一个包括模拟登陆功能的简版 TODO 应用（假设用户不刷新，有能力的人可以使用 localstorage 来完成一个完整的 webapp）

### 框架、工具
- 学会查文档
    - [MDN](https://developer.mozilla.org/zh-CN/docs/Web) 是 web 开发者学习的好地方，不需要刷，但是需要你想了解语法细节的时候，会查、肯看
    - mac 可以使用 dash 阅读 MDN 的文档
    - 其他平台可以使用在线文档 (http://devdocs.io/)
    - 学习框架类库最好的地方就是直接阅读 github README、看官方文档的 get start、github 仓库的 example、源码
- github
    - fork
    - PR
- react
- react-router
    - 什么是前端路由
    - 以往的后端路由是怎么样的（不知道的话请看经典面试题：[输入 url 到页面展示发生了什么](http://simplyy.space/article/56d8377063fac2a8175b41f4#一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？（流程说的越详细越好）) ）
- redux
