# web前端 thinking 教程(3):
## 教学提纲
- 习题讲解
- js 语法基础(1,2,3,4)
    - 构造器、原型链、继承(3)
    - js 事件执行队列
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

### 构造器、原型链、继承
#### 构造器
##### 拓展 new 干了啥
```js
// 创建一个空对象，同时还继承了该函数的原型。
var obj = {};
obj.__proto__ = Base.prototype;

// 以空对象为 this，call 调用函数，，这样以来属性和方法被加入到 this 中。
// 也就是加给了此空对象 。
Base.call(obj);

// 假如有参数的话应该是
Base.apply(obj, arguments);
```

提问： new 为什么要做以上三步

#### 原型链
当查找一个对象的属性时，JavaScript 会向上遍历原型链，直到找到给定名称的属性为止（这种行为我们也称之为委托）。

```js
// 假定有一个对象 o, 其自身的属性（own properties）有 a 和 b：
var o = {a: 1, b: 2}
// o 的原型 o.[[Prototype]]有属性 b 和 c：
var o.__proto__ = {b: 3, c: 4}
// 最后, o.[[Prototype]].[[Prototype]] 是 null.
// 这就是原型链的末尾，即 null，
// 根据定义，null 没有[[Prototype]].
// 综上，整个原型链如下:
// {a:1, b:2} ---> {b:3, c:4} ---> null

console.log(o.a); // 1
// a是o的自身属性吗？是的，该属性的值为1

console.log(o.b); // 2
// b是o的自身属性吗？是的，该属性的值为2
// o.[[Prototype]]上还有一个'b'属性,但是它不会被访问到.这种情况称为"属性遮蔽 (property shadowing)".

console.log(o.c); // 4
// c是o的自身属性吗？不是，那看看o.[[Prototype]]上有没有.
// c是o.[[Prototype]]的自身属性吗？是的,该属性的值为4

console.log(o.d); // undefined
// d是o的自身属性吗？不是,那看看o.[[Prototype]]上有没有.
// d是o.[[Prototype]]的自身属性吗？不是，那看看o.[[Prototype]].[[Prototype]]上有没有.
// o.[[Prototype]].[[Prototype]]为null，停止搜索，
// 没有d属性，返回undefined
```

大多数JavaScript的实现用 `__proto__` 属性来表示一个对象的原型链。 `__proto__` 与 `prototype `的区别何在。（前者是非标准的获取任何对象的 prototype 属性，后者是只有 function 才有的属性, 那么怎么保准的获取非 function 对象的原型呢，[Object.getPrototypeOf(obj)](http://devdocs.io/javascript/global_objects/object/getprototypeof)）


```js
> typeof Object.prototype
'object'
> Object.prototype.prototype
undefined

> Object.prototype.__proto__
null
> Object.prototype.__proto__ === null
true
```

so any object 的原型链终点都是 Object.prototype 一个对象，而他的 prototype 指向 null，其实说白了，原型链就是链表。

继承比较麻烦（实现版本太多了），我就讲一种。

#### 继承
##### 间接原型继承（js 高级程序设计称之为，寄生组合式继承）

MDN [object.create](http://devdocs.io/javascript/global_objects/object/create) 里的第一个 example

```js
// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle; // for rect instanceof Rectangle === true

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle);// true
console.log('Is rect an instance of Shape?', rect instanceof Shape);// true
rect.move(1, 1); // Outputs, 'Shape moved.'
```

提问：
1. constructor 是啥？（查文档回答）
2. constructor 存在哪的？
3. 假如没有 `Rectangle.prototype.constructor = Rectangle;` 这一行，rect.constructor 是啥，为什么？


### js 事件执行队列
> 蛇神带我们读博客系列=。=

http://www.ruanyifeng.com/blog/2014/10/event-loop.html

#### 单线程和多线程的概念
多个线程之间不会相互阻塞（例如其中一个线程在请求网络，另外一个线程响应UI操作，Android开发往往是这么做的）

![](http://7xkpdt.com1.z0.glb.clouddn.com/661a5246f4ca68e1b6c8bb53d482b4bd.png)

#### 为什么JavaScript事实上是单线程的（浏览器端）

多个线程的冲突在DOM操作中难以避免

理想中的多线程和现实中的多线程


#### 同步和异步的区别
这是JS和其他主流语言的差异之一

JS异步的实现机制-任务队列


此处思考：当一个XHR请求发出的时候，整个过程是怎样的？
![](http://7xkpdt.com1.z0.glb.clouddn.com/38204868aac817fc5537a414027488da.png)


思考：JS是单线程的，为什么能够实现异步？
因为浏览器不是单线程的，（事件队列只是JS异步的工作方式，而不是其原因）

#### 事件循环

![](http://7xkpdt.com1.z0.glb.clouddn.com/6f1f7bc71e88e17f1b828d75fff797c2.png)

NodeJS部分因为不甚了解略

### webpack
#### 使用 webpack 运行 es6 程序
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


##### JSX
阅读 http://reactjs.cn/react/docs/jsx-in-depth.html

核心：
1. 如何使用 JSX
2. JSX 中的 JavaScript 表达式
3. JSX 与 html 的不同，标签的属性名采用驼峰法命名，并且有所改动（class => className, onclick => onClick）。

##### react 中的数据绑定和呈现
阅读 http://reactjs.cn/react/docs/displaying-data.html

核心
1. react 怎么做到响应式更新的

#### 详细学习基础知识
https://hulufei.gitbooks.io/react-tutorial/content/index.html

暂时先阅读前四部分即可

然后先详细阅读弄懂核心内容即可。

核心：
1. React.render 干了啥，每个参数的意义
2. JSX 语法
3. 组件
4. this.props
5. this.state


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
