发布时间：2015-11-14
更新时间：2015-11-14 10:41:01
[github 本博客项目](https://github.com/SimplyY/Blog/)
# js thinking(2):语法、对象、函数

## 语法
> 记录需要注意的一些语法

### 注释
使用`//`不要用`/* */`，（因为后者如果有正则符号会导致严重 bug ）
### Number
是64位浮点数。因此值域很大

    Number.MAX_VALUE === 1.7976931348623157e+308
    Number.MIN_VALUE === 5e-324

### 字符串
    'A' === '\u0041'
1. `js` 中所有字符使用的是16位（Unicode字符集, uft-8是它的一种实现）。
2. 字符不能单独出现，不过创建一个仅含一个字符的字符串即可。
3. 并且一旦字符串被创建，就永远无法改变它，也就是说如果你用 `+` 连接字符串所得到的返回值，是一个新的字符串。


#### 有关 Unicode
> Unicode的实现方式不同于编码方式。一个字符的Unicode编码是确定的。但是在实际传输过程中，由于不同系统平台的设计不一定一致，以及出于节省空间的目的，对Unicode编码的实现方式有所不同。Unicode的实现方式称为Unicode转换格式（Unicode Transformation Format，简称为UTF）

> 最常用的就是 uft-8，[wiki](https://zh.wikipedia.org/wiki/UTF-8)

### for in
> 防止迭代原型链的写法

    for (var myVar in object) {
        if (object.hasOwnProperty(myVar)) {

        }
    }

## 对象
### 对象和基本数据类型

![](http://7xkpdt.com1.z0.glb.clouddn.com/f571ebc023dbac7f31f34eec23b9ee41.png)

### 对象是属性的 `容器` ，属性由 `键值` 构成。

![](http://7xkpdt.com1.z0.glb.clouddn.com/ff540b212b828b8b6547ceabb6bd5336.png)

### 没有 class 的对象

![](http://7xkpdt.com1.z0.glb.clouddn.com/e64167dfa501403549b88e34ac45aaab.png)

### 对象字面量
对象字面量是可以嵌套的
![](http://7xkpdt.com1.z0.glb.clouddn.com/d48fea11fa7810dbe7d08ae29aa6c76e.png)

### 检索属性
有两种方式， `.表示法`， 或 `object[attr]`数组访问法，各有用途。

1. `.表示法` 用于当要检索的属性为不变常量时，可读性更好，强烈推荐用。
2. 数组访问法 在属性为字符串变量时，必用（此时点表示法失效）。

#### 例子
    function copyScene(srcScene, desScene) {
        for (var attr in object) {
            if (object.hasOwnProperty(attr)) {
                desScene[attr] = srcScene[attr];
            }
        }
    }

#### 引用
> 引用传值都是浅复制

- 当你需要某个对象的一份拷贝时，一定要用深复制，推荐自己写一个深复制函数。
- 当你需要共享某一个对象时，即需要多个变量对同一个对象进行操作，一定要用浅复制。

#### forin
都最好不用

forin 的迭代无序，且包括原型链。



## 函数
> 函数式 js 的基础模块单元，用于代码复用、信息隐藏和组合调用。

### 原型链
除了一般函数，其他所有的构造器都来自于Function.prototype，甚至包括根构造器Object及Function自身

Function.prototype的__proto__指向 Object.prototype, Object.prototype.__proto__ === null

.prototype是一个对象的原型对象，而`.__proto__`则是对原型对象的引用！

Object实际上是一个函数，所以可以 Object()。
![](http://7xkpdt.com1.z0.glb.clouddn.com/8699e9d42e7e181ca328cfc5653c96f1.png)

### that
调用外部函数 this，使用 that
![](http://7xkpdt.com1.z0.glb.clouddn.com/559cc65be07f76c2b75a4c4108ef58e0.png)

### arguments
arguments不是一个真正的数组

### 给类型添加方法
![](http://7xkpdt.com1.z0.glb.clouddn.com/ae7d195ad85cbca69731def9ed94ae7d.png)
![](http://7xkpdt.com1.z0.glb.clouddn.com/5631040de9f1bce2ffdb83ca46b13ee7.png)

但是我觉得还不如直接

    Number.prototype.integer = function () {
        return xxx;
    }

### 不要在循环内部创建函数
![](http://7xkpdt.com1.z0.glb.clouddn.com/8a1a1aa485bc71d3182b174784a5d380.png)
使用闭包解决
![](http://7xkpdt.com1.z0.glb.clouddn.com/38674bbd8c285d02b39f21fba561c1af.png)
