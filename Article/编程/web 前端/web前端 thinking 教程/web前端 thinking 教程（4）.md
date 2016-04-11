# web前端 thinking 教程(4):
## 教学提纲
- 习题讲解
    - 学习 react 组件
- js 语法基础(1,2,3,4)
    - 构造器、原型链、继承(3)
    - js 事件执行队列

## 习题讲解
代码仓库在 https://github.com/SimplyY/webpack-es6-react-demo

### 关键知识点：
0. import、bind 语法
1. this.props
2. this.states
3. this.setState
4. jsx
5. render

### 优点
1. react 封装了 DOM，无 DOM 操作，并保证了不错的浏览器兼容性
2. 组件化的思想，复用组件非常方便，并且开发的时候采用分治的思想，非常利于维护
3. 拥抱 es6，代码更优雅
4. js 来掌控 html 的显示，使其灵活性更高，不过相应的会在初期开发增加一点开发成本

### 代码
```js
// main.jsx
import React from 'react'
import { render } from 'react-dom'

import Root from './Root'

render(
    <Root />,
    document.getElementById('root')
)

```

```js
// Root.jsx
import React, {Component} from 'react'
import AutoComplete from './component/AutoComplete'

const dataArray = ['a', 'ab', 'abc', 'data', 'dataArray']

class Root extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <AutoComplete dataArray={dataArray}/>
            </div>
        )
    }
}


export default Root
```

```js
// AutoComplete.jsx
import React, {Component} from 'react'

class AutoComplete extends Component {
    constructor() {
        super()
        this.state = {
            inputStr: ''
        }
    }

    render() {
        const { dataArray } = this.props
        const tips = getTips(dataArray, this.state.inputStr)

        return (
            <div>
                <input className="auto-complete-input" onChange={handleChange.bind(this)}/>
                <div className="auto-complete-tips">
                    {tips.map(item => {
                        return (
                            <li key={item}>{item}</li>
                        )
                    })}
                </div>
            </div>
        )
    }
}

function handleChange(event) {
    this.setState({inputStr: event.target.value.trim()})
}

function getTips(dataArray, inputStr) {
    let tips

    if (inputStr === '') {
        tips = []
    } else {
        tips = dataArray.filter(item => {
            return item.toLowerCase().indexOf(inputStr.toLowerCase()) >= 0
        })
    }

    return tips
}

export default AutoComplete
```

## 构造器、原型链、继承
### 构造器
#### 拓展 new 干了啥
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


### 原型链
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

大多数JavaScript的实现用 `__proto__` 属性来表示一个对象的原型链。 `__proto__` 与 `prototype `的区别何在。（前者是非标准的获取任何对象的原型，后者是只有 function 才有的属性, 那么标准是怎么获取非 function 对象的原型呢，[Object.getPrototypeOf(obj)](http://devdocs.io/javascript/global_objects/object/getprototypeof)）

![](http://7xkpdt.com1.z0.glb.clouddn.com/c6e698b8167f33792d15e72ad0a20ec8.png)

然后

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

so any object 的原型链终点都是 Object.prototype 一个对象，而它（Object.prototype）的 prototype 指向 null，其实说白了，原型链就是链表。

### 详解构造器函数

```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}

// 通过原型模式来添加所有实例共享的方法
// sayName() 方法将会被Person的所有实例共享，而避免了重复创建
Person.prototype.sayName = function () {
  console.log(this.name);
};

var person1 = new Person('Weiwei', 27, 'Student');
var person2 = new Person('Lily', 25, 'Doctor');

console.log(person1.sayName === person2.sayName); // true

person1.sayName(); // Weiwei
person2.sayName(); // Lily
```
正如上面的代码所示，通过原型模式定义的方法sayName()为所有的实例所共享。也就是， person1和person2访问的是同一个sayName()函数。

#### 详解 constructor
> 注意这里不是 new 的过程，而是创建构造器函数的过程

只要 **创建了一个新函数**，就会根据一组特定的规则为该函数 **创建一个 prototype 属性** 。

这个属性指向函数的原型对象。 在默认情况下，函数的原型对象都会自动获得一个 constructor 属性，这个属性包含一个指向 prototype 属性所在函数的指针。 也就是说：Person.prototype.constructor 指向 Person 构造函数（指向如同，对象名是对象的引用的意思）。

而对于实例，比如 person1， 它是从 Person 构造器构造的，那么它的 constructor 属性为啥呢

答案是它的 constructor 是通过原型的委托机制得来的，即从 person.prototype.constructor 中得来，指向 Person 构造函数。

![](http://7xkpdt.com1.z0.glb.clouddn.com/a37139c412e1dcf0d990d30431135310.png)

下面的图很清楚的揭露了，构造器，new 出来的实例和构造器原型之间的关系。
![](http://7xkpdt.com1.z0.glb.clouddn.com/7edd3b8f575fd1bbce5e878be8f0c691.png)

### 继承
继承比较麻烦（实现版本太多了），我就讲一种。

#### 间接原型继承（js 高级程序设计称之为，寄生组合式继承）

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

其实呢，我们天天在用的 array、object 的继承关系和上面的代码如出一辙，看下图，Shape 相当于 Object，Rectangle 相当于 Array
![](http://7xkpdt.com1.z0.glb.clouddn.com/a8c122fad8f0568f52f8b285f8ca4393.png)


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

## 作业
### 阅读
#### 颠覆式前端UI开发框架：React
http://www.infoq.com/cn/articles/subversion-front-end-ui-development-framework-react

**核心**
1. 基于HTML的前端界面开发正变得越来越复杂，其本质问题基本都可以归结于如何将来自于服务器端或者用户输入的动态数据高效的反映到复杂的用户界面上。
2. 高性能的 Virtual DOM
3. 一切都是组件：内聚、降低耦合，每个组件只关心自己部分的逻辑，彼此独立。我感觉，在写 HTML 中，原本的 div 等标签就是一行一行的代码，而组件就像函数。
4.


#### 深入浅出React（一）：React的设计哲学 - 简单之美
http://www.infoq.com/cn/articles/react-art-of-simplity


**核心**
1. React取消了函数的自动绑定（在 jsx 的事件回调中）
2. 所谓组件，其实就是状态机器
    > 例如，某个组件有只读和编辑两个状态。一般的思路可能是提供beginEditing()和endEditing()这样的方法来实现切换；而在React中，需要做的是setState({editing: true/false})。在组件的输出逻辑中负责正确展现当前状态。这种方式，你不需要考虑beginEditing和endEditing中应该怎样更新UI，而只需要考虑在某个状态下，UI是怎样的。显然后者更加自然和直观。
3.

#### 深入理解 react
http://reactjs.cn/react/docs/thinking-in-react.html


**核心**
- 使用 react 的步骤
    1. 拆分用户界面成一个组件树
    2. 利用 React ，创建应用的一个静态版本
    3. 识别出最小的（但是完整的）代表 UI 的 `state`
    4. 确认 `state` 的所属组件
    5. 添加反向数据流
- 容器组件，上面第4部中的 **所属组件** 实际上就是找到容器组件，重点思考这种组件和普通组件（stateless）的不同

当我们需要对用户输入、服务器请求或者时间变化等作出响应，这时才需要使用 `State` 。常用的模式是 **创建多个只负责渲染数据的无状态（stateless）组件**，在它们的上层创建一个有状态（stateful）组件(我们常将其称之为组件容器，它和普通组件非常不同)并把它的状态通过 props 传给子级。这个 **有状态的组件封装了所有用户的交互逻辑**，而这些无状态组件则负责 **声明式地渲染数据**。

**难点**
1. 添加反向数据流，反向数据流是指，子组件（stateless 组件）要更改父组件（容器组件）中的 state，这时我们会采取在父组件中声明 handle 函数，然后通过 props 传给子组件，子组件在 onxxx 的时候调用此函数，这样就使得整个的数据流仍然是单向的，并且完全由容器组件来控制整个容器内的 state。
2. react 生命周期


#### 生命周期

![](http://7xkpdt.com1.z0.glb.clouddn.com/6c0f0eae09b64a1763220ae2457ce2bc.png)
