发布时间：2015-11-07
更新时间：2015-11-07 14:20:17
[github 本博客项目](https://github.com/SimplyY/Blog/)
# js good parts thinking(1):序、精华与糟粕、对象

## 系列序
我博客里的js good parts 系列是对[《JavaScript语言精粹》](http://book.douban.com/subject/3590768/)做的笔记和思考。

## 书籍简介
本书通过对JavaScript语言的分析，甄别出好的和坏的特性，从而提取出相对这门语言的整体而言具有更好的可靠性、可读性和可维护性的JavaScript的子集，以便你能用它创建真正可扩展的和高效的代码。

雅虎资深JavaScript架构师Douglas Crockford倾力之作。
向读者介绍如何运用JavaScript创建真正可扩展的和高效的代码。

## 书籍序

![](http://7xkpdt.com1.z0.glb.clouddn.com/3377d949972759590660e2504de9d476.png)

## 精华与糟粕
> 学语言要取其精华，去其糟粕

![](http://7xkpdt.com1.z0.glb.clouddn.com/6c50c5f3fbedb8ce8539cc6f1260e8e1.png)

> 你有权利定义你的子集

![](http://7xkpdt.com1.z0.glb.clouddn.com/e445894b8abb978f65a99ee0e77a91cf.png)



### 优美的特性
- 函数是顶级对象
- 弱类型、基于原型继承的动态对象(如果你对动态类型和静态类型不解或者想深入了解请移步 [我的博文](http://simplyy.space/blog/article/%E9%9D%99%E6%80%81%E8%AF%AD%E8%A8%80%20or%20%E5%8A%A8%E6%80%81%E8%AF%AD%E8%A8%80))
- 富有表达力的对象、数组字面量

### 糟糕的特性（坑）
> 如果想要避免自己使用糟糕的特性，使用 `jshint` 或者其他的一些 linter 插件工具吧。

#### 全局变量
> 坏处容易造成 bug、且难以 debug。

解决办法:使用闭包，或者 `commonjs` 或 `AMD`

    (function() {
        // body...
    })();

#### 自动插入分号
（坏处同上，每个语句后面加上分号）

#### typeof
#### parseInt(str, int)
> 遇到非数字会自动停止解析，请一定加上第二个参数来设置进制.

不然假如第一个参数是零开头就会以8进制求值，比如"08"，返回零，因为8进制没有"8"

#### +
> `+` 的两个运算数只要一个不是 `number` 类型，`+` 就会做字符串拼接。

n 多 bug 之源。
##### 示例
![](http://7xkpdt.com1.z0.glb.clouddn.com/0b1ffc7f9b96b8a99ff1db55c69325e2.png)

#### 浮点数
> 0.1 + 0.2 不等于0.3

但有时小数的判断是必要的，这个时候一定要控制精度来避免错误。

![](http://7xkpdt.com1.z0.glb.clouddn.com/0f025e3dc6afa97d6cc12d9d02314871.png)

解决办法：
使用 `js` 库

https://github.com/MikeMcl/decimal.js


#### NaN
> 全局属性 NaN 表示 Not-A-Number 的值

> 在编码很少直接使用到 NaN。通常都是在计算失败时，作为 Math 的某个方法的返回值出现的.例如：Math.sqrt(-1)

NaN 表示 `不是一个数字`，当输入把非数字形式的字符串转化为数字时产生。并且 NaN !== NaN


    > typeof NaN === 'number'
    true
    > parseInt('oop')
    NaN
    > Math.sqrt(-1)
    NaN
    > NaN === NaN
    false
    > NaN !== NaN
    true


##### 如何判断一个数是不是数字
> isFinite 可以筛选 NaN 和 Infinity(全局属性 Infinity 是一个数值，表示无穷大。),但是会试图非数字变成数字，如'0'

    isFinite(NaN);       // false
    isFinite(-Infinity); // false

    isFinite(0);         // true
    isFinite("0");       // true, would've been false with the more robust Number.isFinite("0")
    isFinite('a')
    false

解决办法，先确保 value 是一个数字

    function isNumber(value) {
        return typeof value === 'number' && isFinite(value);
    }

#### 伪数组
> js 没有真正的数组


    typeof []
    'object'

检测一个值是不是数组

    function isArray(value) {
        return Object.prototype.toString.apply(value) === '[object Array]'
    }


#### undefined和null
阮一峰写过一篇[博客](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html) 如果想弄懂这两个值的典故，值得去学习一下。下面是我的主要摘录。

> undefined和null在if语句中，都会被自动转为false

> null表示"没有对象"，即该处不应该有值。

典型用法是：
1. 作为函数的参数，表示该函数的参数不是对象。
2. 作为对象原型链的终点。


    Object.getPrototypeOf(Object.prototype)
    // null


> undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。

典型用法是：
1. 变量被声明了，但没有赋值时，就等于undefined。
2. 调用函数时，未传入参数，函数内部该参数等于undefined。
3. 对象没有赋值的属性(类似变量被声明了没有赋值)，该属性的值为undefined。
4. 函数没有返回值时，默认返回undefined。

#### 对象
> js 的对象永远不会试真的空对象。它可以从原型链中获取成员属性

比如

    > var a = {}
    undefined
    > a.constructor
    [Function: Object]

![](http://7xkpdt.com1.z0.glb.clouddn.com/7af9844da77393984091fa575577b8d6.png)

#### 函数
请无时无刻理解，函数是一种数值。

### 糟粕（避免使用）
1. == (请使用 ===)
2. with
3. eval
4. 位运算（性能慢）
5. void
