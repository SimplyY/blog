# js thinking(4)：易错
## 对象字面量
### node
常见的有 node 里面
```js
// with bug
exports = {
    a: 'b'
}

// right
module.exports = {
    a: 'b'
}
```

好，现在我们来思考一下为啥。

**首先 看看 exports 和 module.exports 的区别：**

1. exports 是指向的 module.exports 的引用
2. module.exports 初始值为一个空对象 {}，所以 exports 初始值也是 {}
3. require() 返回的是 module.exports 而不是 exports

**对象字面量就是返回一个对象**

```js
exports = {
    a: 'b'
}
```
**这里会使 exports 指向了一块新的内存**（存储对象的地方），这样以来 module.exports 和它指的地方就不一样了

so why bug

那么同样的，当我们写代码的时候，也要避免类似的错误，对象字面量会返回一个对象，这样以来会让原来的变量指向一块新的内存。也就是覆盖。

### 原型

so 在对原型进行操作的时候，我们很容易写出这样的代码

```js
A.prototype = {
    b: 1,
    c: function() {
        console.log(1)
    }
}
```

假如 A 是一个构造器函数，那么我们会将 A 原来的 prototype 覆盖掉。

这样以来，A 原来 prototype.constructor 就没啦，所以当我们在使用 Object.create 来实现原型继承的时候，要把没的东西弄回去。
```js
A.prototype = Object.create(B.prototype)
A.Prototype.constructor = A
```

## indexOf 判断元素是否在数组的缺陷
`array.indexOf(item) !== -1 `

不能对多维数组、对象数组来判断元素是否在数组里。
因为它会对对象进行`===`判断。即便对象的值一样，但是对象的内存地址不一样，`array.indexOf(item)` 会总是返回-1

解决办法

```js
// element can be Object, String, Number etc
function isInArray(element, array) {
    for (var i = 0; i < array.length; i++) {
        if (JSON.stringify(element) === JSON.stringify(array[i])) {
            return true;
        }
    }
    return false;
}

// test performance
var element = []
for (var i = 0; i < 1000; i++) {
    element.push(1)
}
var t0 = Date.now();
JSON.stringify(element);
var t1 = Date.now();
console.log(t1 - t0);

// 当 element 为简单数据类型时，JSON.stringify(element);性能很高（element 为 1000 长度的字符串时，才会大于 1 毫秒，小于10 ms）
// 注意，当 element 为数组的 length 大于 10000 时，JSON.stringify(element);性能会开始变低（大于0.01秒），但是绝大多数情况不会大于这么多，所以还是在需要性能优化的时候再性能优化。
```


## JavaScript 语句后应该加分号么？

链接：https://www.zhihu.com/question/20298345/answer/14670020
来源：知乎

### 不加分号的好处
1. 人总是有可能忘记写分号。ASI导致无法区分是无意中忘记还是有意不写（代码折行）。
2. “总是写分号”并不能完全解决ASI缺陷（如return后换行会自动插入分号）。
3. “}”后是否要加分号需要回溯到对应“{”之前进行语义判断（是否是函数表达式），成本远高于前置分号判断（只要对行首字符进行token判断：是否是 [ ( + - / 五个符号之一）。

### 如何不加分号
- 只要对行首字符进行token判断：是否是 [ ( + - / 五个符号之一，是的话要加分号，否则不需要
- return后如果没有 { 换行会自动插入分号
