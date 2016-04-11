# web前端 thinking 教程(3):
## 教学提纲
- 习题讲解
- es6 语法、webpack
    - 解构、let和const、扩展运算符(3)
    - Module（重点）
    - 使用 webpack 运行 es6 程序
- react
    - 基础知识、demo 演示

### 习题讲解

https://github.com/SimplyY/web-front-end-thinking-tutorial/blob/master/practice/yuwei/2/index.js

其中事件代理、兼容性处理、通过更改 class 来动态更改样式，这些都写得非常不错

[why 事件代理](https://github.com/abell123456/communicate#题目4使用原生js实现事件代理)

### webpack
#### 使用 webpack 运行 es6 程序
> 使用 npm 命令前得设置一下淘宝源，这样下载速度会很快
> npm config set registry https://registry.npm.taobao.org

https://github.com/rauschma/webpack-es6-demo 大家把这个项目 clone 到本地，并用命令行 运行 npm install

我们之后写 react 就是用 webpack 来将 es6代码编译成 es5（在浏览器无压力运行），

注意： 命令行 运行 npm install  是指，在你 clone 下来的项目的根目录

搞定后，你就可以写和运行 es6代码了。

#### webpack 介绍
阅读：https://segmentfault.com/a/1190000004172052  (看到中间的打包javascript模块就可以停下来了，webpack 的其他功能等有需求了再用)

重点理解:
1. webpack.config.js 里面的 entry、resolve、output、loaders、plugins 是啥，然后弄懂之前 clone 下来的 webpack-es6-demo 的 webpack.config.js 每一行干了啥
2. 理解模块化开发是什么意思
3. 瞧一瞧最终打包出来的 js 文件（没有 min 后的）大概长什么样，干了啥(提示：webpack 会将你写的每一个js文件，封装成一个函数模块，你 js 文件中全局声明的变量，实际上会变成函数模块中的私有变量，也就是外界不可见的，除非你声明对象不用var,let关键字)

### es6 语法
#### let, const

阅读：[let, const](http://simplyy.space/article/56c2d71f6ba384e02299f9aa#let和const命令)

总结：
1. let 和 const 都是块级作用域，并且不存在变量声明提升
2. const 声明变量，变量不可变（对于基本类型来讲，就是值不可变，对于引用类型来讲，就是变量名所指向的地址不可变，也就是说 const 对象的属性可变）

#### 解构赋值
阅读： [变量的解构赋值](http://simplyy.space/article/56c2d71f6ba384e02299f9aa#变量的解构赋值)

总结：
1. 解构赋值，其实说白了就是，让 `=` 左右两边进行模式匹配，这样原来要写多行的赋值代码，可以用一行简洁的写出来，并且易读。
2. 对象的解构赋值可以无序，因为有键标志，使得能够一一对应，而数组，必须有序，这样以来就可以通过有序的下标来一一对应。
3. 大括号不能写在行首，要用圆括号括起来（不常用），或者将声明关键字 `let`、`const` 放在行首。

非常常用的一个特性，无论是使多行赋值语句变简洁，在后面的 module （模块化开发）那块，运用很多

#### rest,扩展运算符
阅读：
1. [rest参数](http://simplyy.space/article/56c2d71f6ba384e02299f9ab#rest参数)
2. [扩展运算符](http://simplyy.space/article/56c2d71f6ba384e02299f9ab#扩展运算符)

#### Module（重点）
阅读：
[Module](http://simplyy.space/article/56c2d71f6ba384e02299f9ae#Module)

#### 使用 es6
在从 https://github.com/rauschma/webpack-es6-demo  clone 下来的仓库里面，使用之前学到的 es6 语法写一写代码，并运行。

### react
#### 介绍
##### 为什么使用 React
阅读：http://reactjs.cn/react/docs/why-react.html

核心：
1. 可组合的组件
2. React 是不会去操作 DOM 的

#### 详细学习基础知识
react 基础教程(1到4章) https://hulufei.gitbooks.io/react-tutorial/content/index.html

暂时先阅读前四部分即可

然后先详细阅读弄懂核心内容即可。

核心：
1. React.render 干了啥，每个参数的意义
2. JSX 语法
3. 组件
4. this.props
5. this.state

弄懂类组件的属性(props)与状态(state) http://wwsun.github.io/posts/react-with-es6-part-2.html

#### 使用 es6 + react demo
1. clone https://github.com/SimplyY/webpack-es6-react-demo
2. npm install
3. webpack
4. open html

然后就可以在此仓库里面写 react 组件了

如果要提交作业，将 .git 文件夹（默认隐藏，得打开隐藏可见）删掉，然后将这个仓库文件夹，放到原来的作业项目里的 practice/3/xx/ 文件夹里即可

#### classnames 介绍
https://github.com/JedWatson/classnames

#### 作业
使用 es6 webpack react 写简版的搜索栏
http://reactjs.cn/react/docs/getting-started.html

#### 简版答案
http://simplyy.space/article/57062adbb194638f7d6d273f

### 其他
#### 命令讲解
npm install 的意思是安装当前项目的所有依赖，其中 npm 是 node 的包管理器

详解：非常棒的文章，值得仔细阅读  http://www.infoq.com/cn/articles/msh-using-npm-manage-node.js-dependence

webpack 则是会以 webpack.config.js 作为 webpack 启动的默认配置文件，去工作，其中 webpack.config.js 决定了 webpack 干啥。
