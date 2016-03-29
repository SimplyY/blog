# web前端 thinking 教程(0)：序

## 教学提纲
### 基础
- 编程基础
    - 你有多喜欢编程
    - 你平均每天在编程上花多少时间
    - 除了看书、写代码，你的思考有多少
    - chrome dev tool：控制台调试、断点调试、性能检测
- js 语法基础
    - string、array 常用方法
    - 闭包
    - this
    - 原型链、继承
    - js 事件队列
    - 回调函数的原理
    - es6 常用语法基础
        - 解构、let和const、扩展运算符
        - 箭头函数、Promise 对象
        - Module（重点）
- dom 基础
    - DOM 增删改查
    - DOM 事件机制
- css 基础（不讲）
- git 基础（不讲）
- web 性能优化基础
    - 看书了解原理:[《高性能网站建设指南》](http://book.douban.com/subject/3132277/)
    - 请求数量: 合并脚本和样式表, iconfont，拆分初始化负载，划分主域
    - 请求带宽: 开启 GZip，精简 JavaScript，移除重复脚本，图像优化
    - 缓存利用: 使用 CDN，使用外部 JavaScript 和 CSS，减少 DNS 查找
    - 页面结构: 将样式表(影响样式的内容)放在顶部，将脚本放在底部，尽早刷新文档的输出

### 实战
> 1. 都是 纯前端项目、2人一组，通过 fork + PR 来在 github 上面提交
> 2. 所有项目可以使用 boostrap、purecss 这种 css 样式库，自己就可以省掉写 css 的时间快速学习、开发。
> 3. 完成基本功能就 ok，自由发挥为主（选择如何组织项目结构、选择使用的库，自己当自己的架构师）


#### 小作业
- 使用 DOM 写简版的搜索栏（功能和百度谷歌类似）
- 模仿前端渲染框架工作原理（比如模仿 react）写个简版 TODO(可以选择使用 jquery)
- 使用 react 写个简版 TODO

#### 大作业
- 使用 react react-router redux 写一个包括模拟登陆功能的简版 TODO 应用（假设用户不刷新，有能力的人可以使用 localstorage 来完成一个完整的 webapp）
- 或者自己的点子，还是用 react react-router redux 的技术栈

### 框架、工具
- 学会查文档
    - [MDN](https://developer.mozilla.org/zh-CN/docs/Web) 是 web 开发者学习的好地方，不需要刷，但是需要你想了解语法细节的时候，会查、肯看
    - mac 可以使用 dash 阅读 MDN 的文档
    - 其他平台可以使用在线文档 (http://devdocs.io/)
    - 学习框架类库最好的地方就是直接阅读 github README、看官方文档的 get start、github 仓库的 example、源码
- github
    - fork
    - PR
- webpack
    - 使用 es6 等预处理器
    - 开发(dev)环境和生产(production)环境
- react
    - 基本概念
    - 基本使用
    - vitural DOM
- react-router
    - 什么是前端路由
    - 以往的后端路由是怎么样的（不知道的话请看经典面试题：[输入 url 到页面展示发生了什么](http://simplyy.space/article/56d8377063fac2a8175b41f4#一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？（流程说的越详细越好）) ）
    - 基本使用
- redux
    - 基本概念
    - 基本使用
    - react-redux

## 推荐书籍
- dom 入门书： 《js dom 编程艺术》
- js 进阶书：[JavaScript语言精粹](https://book.douban.com/subject/3590768/)、effective js、 you dont know js
- 其他：[《高性能网站建设指南》](http://book.douban.com/subject/3132277/)

## 推荐在线学习资料
- git 小白入门：http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
- github 博客： https://github.com/CoderUnion/coderunion-github-talk/issues/87
- weibo：https://github.com/CoderUnion/coderunion-github-talk/issues/86
