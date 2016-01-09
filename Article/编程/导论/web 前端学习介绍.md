# web-front-end-learning-intro

## web 前端简单介绍
web 前端就是写网页上 ui 和交互的代码。
其中网页包括 pc 端、移动端的浏览器访问，也包括移动端的 webview，比如淘宝的双十一活动页面、商品页面等。

前端工程师要学的东西：HTML / CSS / JavaScript，三种语言入门都很简单，所以前端门槛低，但是相应的深入就有些困难，需要懂很多东西。

### 代码编写工具
那么我们怎么写代码呢，使用 chrome dev tools（或者firefox 的 firebug 插件） + 编辑器（atom）

### 网页的构造
首先我们要了解一下网页是什么，怎么构成的。

在chrome dev tools（windows 下 f12 进入，mac 下右键“检查”）里，
![](http://7xkpdt.com1.z0.glb.clouddn.com/8b245a5673e55a12a3bc8156e204d020.png)

其中 html 是文档骨架([MDN 的 html 入门教程](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Introduction))，css ([MDN css 入门教程](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started)) 为 html 加上了样式，两者共同完成了 ui，js （[js 入门书籍:js dom 编程艺术](http://book.douban.com/subject/6038371/)） 完成交互和动态的做一些事，比如向服务器接收、发送数据等。html 和 css 是基础，如果你要深入学习 web 前端就得学好 js，对于复杂交互的页面，js 占整个页面工作量的绝大部分。


### 编辑器
我个人认为，chrome 就是我们的 ide，可以断点调试、分析性能等等，所以我们只需要一个编辑器来写代码就行了。当然编辑器要支持 [程序员修炼之道](http://book.douban.com/subject/5387402/) 里说的可配置、可扩展（使用插件）和可编程（编写插件），当然这些是进阶要求了，基本编写代码的要求必须要有优秀的语法高亮和代码补全功能。

符合上述要求的 atom 的效果图
![](http://7xkpdt.com1.z0.glb.clouddn.com/3b3bf29fabf5f7846289a0bb00ec434d.png)

这就是我们编写的代码，可以直接双击 html 用浏览器运行，也可以放到服务器上面，然后浏览器和 webview 都能通过 url 发出 http 请求来获取 html 来显示网页。


## 进阶
- 架构模式（推荐 mvvm 的 vue [入门教程](http://cn.vuejs.org/guide/)，mvvm 适合大量的 dom 操作也就是复杂交互的页面，特别是非常适合web单页应用）
- 版本控制(和比人合作开发, 最常用的git [git 教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000))
- github （学习别人的项目和开发自己的项目, [github 介绍](http://simplyy.space/blog/article/github%20%E7%9A%84%E4%B8%96%E7%95%8C) ）
- 性能优化（动物书之狗书 [高性能网站建设指南](http://book.douban.com/subject/3132277/) ）
- 代码模块化打包工具、性能优化构建工具（比如 webpack [教程](http://www.html-js.com/article/Study-notes-webpack-tutorial%203113) ）
- node.js （其实打包工具和构建工具都是 node 写的，阿里大牛写的 [node.js 教程](https://github.com/SimplyY/node-lessons) ）。
- 待补充

图来自 https://www.zhihu.com/question/38924821/answer/79207681
![](http://7xkpdt.com1.z0.glb.clouddn.com/1280072e6def04f95d03d8def95846f1.png)
