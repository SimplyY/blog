# web前端 thinking 教程(2):

> 这次讲课开始从，老师讲课，到老师教大家如何阅读

> 包括如何搜集好的阅读资料、阅读技巧

## 提纲
- 阅读
- 编程素养
    - 编码风格（见 [issue](https://github.com/SimplyY/web-front-end-thinking-tutorial/issues/7) ）
    - 如何用好谷歌（见我 [博客](http://simplyy.space/article/56c2d71f6ba384e02299f9a5) ）
    - 解决问题的能力
    - css 设计指南
- 讲评作业
    - 演示代码
    - 讲解代码
    - 演示如何 debug
- js 语法基础(1,2,3,4)
    - this(2)
- dom 基础(2)
    - DOM 增删改查
    - DOM 事件机制
- 实践部分
    - 演示一个 demo

## 阅读
### 推荐在线学习资料
- git 小白入门：http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
- github 博客： https://github.com/CoderUnion/coderunion-github-talk/issues/87
- weibo：https://github.com/CoderUnion/coderunion-github-talk/issues/86

### 搜集好的阅读资料
- 擅长谷歌
- github、微博工具用起来
- 如果代码丑、界面丑通常都是不好的资料，因为厉害的人都是力求尽量完美的，编码风格很差，内容差的可能性大于90%

### 阅读技巧
#### 提取核心内容
文章资料大部分的话，是给核心内容铺垫、说明的。

列提纲、圈点勾画、做笔记，都是能将核心内容提炼、加深理解的过程。

### 多读：熟能生巧

https://github.com/CoderUnion/coderunion-github-talk/issues/19 (5min 阅读)

一年前，我觉得我是被蛇神碾压的（因为真心读的少，编程书不到5本，网上的博客不到50篇），经过一年读了十几本书，几百篇博客，现在我觉得阅读中文内容蛇神已经不能碾压我了（然而英文仍然能 orz），所以，这个东西是可以锻炼出来的，俗话说得好，**熟能生巧，但是记住要刻意的训练**。

附：刻意训练相关我博客有提到

http://simplyy.space/article/56c2d71f6ba384e02299f999

总之就是要
1. 刻意训练
2. 多获取反馈
3. 深刻理解事物的内部原理


### 多练：获取反馈、深刻理解
知识只是记忆并不能真正深刻理解，运用知识是最佳的理解知识的方式，并且运行知识，往往能举一反三，触类旁通，达到从 **行中学到新的知识** （读万卷书不如行千里路的原因 ），这才是深入学习。

提问：所以我们应该干啥，在学了新的知识后？


## 编程素养
### 编码风格
大家的编程风格还是问题不少，可能是大学里面没有老师强调的缘故？

**但是代码这东西，首先是写给人看的（自己和团队合作者），其次才是给机器运行的**

也就是说，代码的可读性至关重要。

学习 js 的代码风格，建议看看这几个

- 函数相关 http://simplyy.space/article/56c2d71f6ba384e02299f9b5
- 命名相关 http://simplyy.space/article/56c2d71f6ba384e02299f9b4
- js 简略版 https://github.com/hiwanz/javascript-style-reference
- js 详细版 https://github.com/fex-team/styleguide/blob/master/javascript.md


多体会一下别人代码为什么能写的那么好看、易读，代码要写的优雅。

主要就是缩进、函数名、变量名、大括号这几块一定要非常注意。

有能力者使用 jshint 之类的来约束自己，提醒自己代码有哪些不规范的地方。

### 如何用好谷歌
http://simplyy.space/article/56c2d71f6ba384e02299f9a5

### 锻炼自己谷歌的能力
熟能生巧、刻意训练。

### 解决问题的能力
1. 透彻的分析问题
2. 思考用什么技术方案（谷歌，stackoverflow，积累）
3. 实干（文档，谷歌）
4. 碰到新的问题
5. 回溯


## css 设计指南
很薄的一本书，重点前五章，200面，一星期就可以看完。

下载地址 http://pan.baidu.com/s/1eSygaUe


## 讲评作业
1. 演示代码
2. 讲解代码

```js
// 1.将数字字符串:'123'转化为数字：123：
var str = '123';
var number = parseInt(str, 10);
console.log(number);

// 2.使用Number函数将数字字符串数组：['1','2']转化为数字数组：[1,2]:
var array = ['1','2'];
var numberArray = array.map(Number);
console.log(numberArray);

//3.将集合转化为真正的数组
var childCollection = document.querySelectorAll('div');
var childs = Array.prototype.slice.call(childCollection);
// 提问： why？

//4.写一个spacify函数，使得spacify('hello world')，返回'h e l l o w o r l d'
function spacify(str){
    var newStr = str.replace(/\s/g,'').split('').join(' ');
    console.log(newStr);
    return newStr;
}
spacify('hello world'); //'h e l l o w o r l d'

//5.写一个函数，将英文字符串重新按照字母排序，比如cba，返回abc
function sortStr(str){
    var sortedStr = Array.prototype.slice.call(str).sort().join('');
    console.log(sortedStr);
    return sortedStr;
}
sortStr('cbdae'); //abcde

//6.var a = ['a', 'b', 'c', 'd']，每过1秒log一下数组中的值（闭包）
function logEverySecond(){
    var a = ['a', 'b', 'c', 'd'];
    for (var i = 0; i < a.length; i++) {
        (function(j){
            setTimeout(function(){
                console.log(a[j]);
            }, j * 1000);
        })(i);
    }
}
logEverySecond();
// 提问：why？

//7.定义log，然后它可以代理console.log的方法（使用apply）
function log(){
    console.log.apply(console, arguments);
}
log('sss');

//8.写出打印的输出（this指向）
var User = {
    count: 1,

    getCount: function(){
        return this.count;
    }
};

console.log(User.getCount()); //1. this指向 User，打印 User.count

var func = User.getCount;
console.log(func()); //undefined
```

## js 语法基础
> 这次课，大部分的线上资料，都是通过谷歌搜到的，谷歌非常棒，大家都要学会它。

### this
上次作业 7、8 两题

http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html

#### 总结
1. 纯粹的函数调用: this 就代表全局对象 Global（浏览器下就是 window）。
2. 作为对象方法的调用: this 指向调用方法的对象。
3. 作为构造函数调用：this 就指向 **构造器创建的新对象**
4. apply, call, bind调用：this 指向就是这些函数的第一个参数

#### 易错
第八题我在 react 中错过类似的。

提问：错误原因

```js
var componentA = {
    // ....xxx
    // 提示 setState 依赖与 this 对象，即在 setState 函数内部使用了 this
    render: function() {
        func(this.setState)
    }
}
function func(setState) {
    setState({x: 1})
}
```

应该写成
```js
var componentA = {
    // ....xxx
    render: function() {
        func(this)
    }
}
function func(that) {
    that.setState({x: 1})
}
```


### 作用域
上次这个应该在闭包之前讲，我的疏忽。


#### 函数作用域
#### 块级作用域
#### 声明本身会被提升

```js
a = 2
var a
console.log(a)
```
```js
console.log(a)
var a = 2
```

![](http://7xkpdt.com1.z0.glb.clouddn.com/577b0c014d021b932a8385178b68791b.png)

#### 函数声明会被提升

![](http://7xkpdt.com1.z0.glb.clouddn.com/5c2150b85bab6596c6f82eb943747d85.png)

#### 函数表达式不会被提升

![](http://7xkpdt.com1.z0.glb.clouddn.com/f67a9e68846754dbd55590b9d57ea2df.png)

提问：typeError 具体是啥

![](http://7xkpdt.com1.z0.glb.clouddn.com/070b83699fd9efa3fea8c19bcb07eede.png)

#### 函数提升优先

> 补充知识，重复的声明会被忽略

![](http://7xkpdt.com1.z0.glb.clouddn.com/2389330bb748bf4022234045bb8b73a8.png)


函数提升优先 的意思就是 函数会被先提升，然后才是变量

![](http://7xkpdt.com1.z0.glb.clouddn.com/52eb2ef20950313734a86c164d7071d4.png)


## dom 基础
### DOM 增删改查
#### （1）创建新节点
- createElement()   //创建一个具体的元素
- createTextNode()   //创建一个文本节点

#### （2）添加、移除、替换、插入
- appendChild()

```js
var aChild = element.appendChild(aChild);
```
- removeChild()

```js
// Removing a specified element when knowing its parent node
var parent = document.getElementById("top");
var child = document.getElementById("nested");
var throwawayNode = parent.removeChild(child);

// Removing a specified element without having to specify its parent node
var node = document.getElementById("nested");
if (node.parentNode) {
    node.parentNode.removeChild(node);
}

// Removing all children from an element
var element = document.getElementById("top");
while (element.firstChild) {
    element.removeChild(element.firstChild);
}

```

- replaceChild()

```js
// Syntax
var replacedNode = parentNode.replaceChild(newChild, oldChild);
```

- insertBefore() //在已有的子节点前插入一个新的子节点

```js
//Syntax
var insertedNode = parentNode.insertBefore(newNode, referenceNode);
//If referenceNode is null, the newNode is inserted at the end of the list of child nodes.
```

```js
// create a new div element
// and give it some content
var newDiv = document.createElement("div");
var newContent = document.createTextNode("Hi there and greetings!");
newDiv.appendChild(newContent); //add the text node to the newly created div.

// add the newly created element and its content into the DOM
var currentDiv = document.getElementById("div1");
var parent = document.getElementById("top");
parent.insertBefore(newDiv, currentDiv);
```

### DOM 事件传递机制
阅读这里 http://itbilu.com/javascript/js/Ek6pnznye.html

简单的来说，当用户点击一个 div 或者 button 的时候，会触发一个 click 事件，那么这个事件是如何传递的呢？

总共三个阶段
1. 首先会经过 **事件捕获阶段**，从整个 document 到 body 逐级往下
2. 一直到 那个 div
3. 然后开始 **事件冒泡阶段**，从那个 div 开始逐级向上，一直向上冒泡到 body、document。


### 实践部分
演示我的 demo

### 演示如何 debug
chrome-dev-tool


## 实践
如 winter 所写的 http://www.cnblogs.com/winter-cn/p/3350728.html 我们做个简易版的搜索补全组件就行

### 我们的要求
1. 必须使用原生 DOM 操作，不能使用任何 js 类库。
2. 必须完成补全显示。
3. 选择性的完成 键盘、鼠标交互事件。

## 标准答案
https://github.com/SimplyY/web-front-end-thinking-tutorial/blob/master/practice%2Fyuwei%2F2%2Findex.js
