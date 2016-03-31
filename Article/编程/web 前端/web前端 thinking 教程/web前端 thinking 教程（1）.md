# web前端 thinking 教程(1):
## 提纲

- 编程基础(1)
    - 你有多喜欢编程
    - 你平均每天在编程上花多少时间
    - 除了看书、写代码，你的思考有多少
    - chrome dev tool：控制台调试、断点调试、性能检测
- js 语法基础(1,2,3,4)
    - string、array 常用方法(1)
    - 闭包(1)
- 学会查文档(1)
    - [MDN](https://developer.mozilla.org/zh-CN/docs/Web) 是 web 开发者学习的好地方，不需要刷，但是需要你想了解语法细节的时候，会查、肯看
    - mac 可以使用 dash 阅读 MDN 的文档
    - 其他平台可以使用在线文档 (http://devdocs.io/)
    - 学习框架类库最好的地方就是直接阅读 github README、看官方文档的 get start、github 仓库的 example、源码
- github(1)
    - fork
    - PR
- 实践
    - 字符串、array 操作题目
    - 闭包题
    - this

## 学习编程
![](http://7xkpdt.com1.z0.glb.clouddn.com/2d949e2dcc3ef39698b47ea0786cb75c.png)

- 你有多喜欢编程
- 你平均每天在编程上花多少时间
- 除了看书、写代码，你的思考有多少

## string、array 常用方法
### Array
#### array.concat(item...)
返回一个新数组，[array, items]。其中 item 可以是数组，也就是可以用来拼接数组.

```js
var a = [1, 2]
var b = [3, 4]
var c = a.concat(b) //c [ 1, 2, 3, 4 ], a [1, 2], b [3, 4]
```


注意：
> MDN: concat does not **alter** this or any of the arrays provided as arguments but instead returns a shallow copy **that contains copies of the same elements combined from the original arrays**. Elements of the original arrays are copied into the new array as follows:
- Object references (and not the actual object): concat copies object references into the new array. Both the original and new array refer to the same object. That is, if a referenced object is modified, the changes are visible to both the new and original arrays.
- Strings and numbers (not String and Number objects): concat copies the values of strings and numbers into the new array.


总的来说
1. concat 不会修改 array 和 item
2. 并且尤为重要的是，concat 是 **浅复制的**，不是对于数组对象，而是对于 **数组包含的元素的浅复制**。

#### 队列、堆栈
- shift、 unshift
- push、pop


#### array.join(separator)
数组格式化输出，返回字符串。以 separator 分隔，separator 默认为','
```js
[1,2,3].join(' ') // '1 2 3'
```

#### array.slice
> slice 含义: 切片

返回数组中的一部分的浅复制，也是只对数组中的元素进行浅复制

#### array.splice(start, deleteCount, items...)
splice: 拼接
deleteCount默认为 max（如果不传参数），即 start 之后全部 delete 掉

- 返回值数组为，array[start, start + deleteCount - 1] , 即start 之后到 start + deleteCount 之前为。
- **此方法会改变原数组**，原数组会变成，array[0, start -1] + items + array[start + deleteCount, end] , 即连接了 start 之前的数组和 items 和start + deleteCount之后的数组，
xxx 之前： array[xxx] 前，不包括array[xxx]，xxx即为 end。
xxx 之后： array[xxx] 后，包括array[xxx]，xxx 即为 begin。

- 注意：所有 begin,start 都是包括的，所有 end 都是不包括的，类比 for 循环的起始条件和终止条件。
- 口诀：函数传参，**包括起点不包括终点**（最好背下来）。

注意2：当 start,end 大于等于 length 时，并不会报错。而关键的是当它们的值为负数时，且小于-length 时，亦不会报错，而且更关键的是，它们的值 **如同0一般**。

```js
[1, 2, 3].slice(4) // []
[1, 2, 3].slice(-4) // [ 1, 2, 3 ]
```

### 高级函数
#### foreach
假设我们有一个数组，每个元素是一个人。你面前站了一排人。foreach 就是你按顺序一个一个跟他们做点什么，具体做什么，随便

```js
people.forEach(function (dude) {
    dude.pickUpSoap();
});
```

#### reduce
The reduce() method applies a function against an accumulator and each value of the array (from left-to-right) to **reduce it to a single value**.

```js
[0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, currentIndex, array) {
    return previousValue + currentValue;
});//10
```

#### map
新数组会和原数组长度一致，比如下面函数 doubles === [ undefined, 8, 18 ]

```js
var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
    if(num === 1){
        return;
    }
    else {
        return num*2
    }
})

var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
// roots is now [1, 2, 3], numbers is still [1, 4, 9]
```

#### filter

```js
function isBigEnough(value) {
    return value >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
```

### String
#### string.charAt(pos)
返回只含一个字母的字符串

#### string.indexOf(searchString, position)
返回字符串里面的字母所在的位置下标，实际上把把 string 看成一个 char[]，更容易理解

#### string.slice(start, end)
返回子字符串，参数可以为负数

#### string.match(regexp)
返回比配字符串，假如有正则表达式为/xxx/g则，返回一个数组，否则返回第一次匹配到的字符串

#### string.replace(searchValue, replaceValue)
替换字符串，searchValue 可以为正则表达式。

## 闭包
### 闭包的形成
js 是函数作用域的，当有函数嵌套的时候，其中内层函数可以访问外层函数里的变量，这时便形成了闭包。

```js
// 其中 displayName、myFun 就是 闭包。
function makeFun() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc= makeFun();
myFun();
```
### 演示
- chrome dev tool：控制台调试、断点调试、性能检测

### MDN中说道
> 1. 闭包是指函数有自由独立的变量。也就是，定义在闭包中的函数可以“记忆”它创建时候的环境（即其作用域存在的所有变量）。
> 2. 闭包是一种特殊的对象。它由两部分构成：函数，以及创建该函数的环境（两者合起来可以视作为整个外层函数 makeFunc 的返回值 myFunc）


### 用处
1. 设计模块中的私有属性和方法（闭包中的自由变量 如上面代码的 `name`，它无法被直接访问）
2. 让这些变量的值始终保持在内存中(可以被延迟调用，比如事件 handler，ajax 异步调用的回调函数等)。


## 分组、github
### 实践介绍
> 1. 都是 纯前端项目、2人一组，通过 fork + PR 来在 github 上面提交
> 2. 所有项目可以使用 boostrap、purecss 这种 css 样式库，自己就可以省掉写 css 的时间，来快速学习、开发。
> 3. 完成基本功能就 ok，自由发挥为主（选择如何组织项目结构、选择使用的库，自己当自己的架构师）

### 具体步骤

- 两人一组
- fork https://github.com/SimplyY/web-front-end-thinking-tutorial
- clone 仓库到本地
- 在 github 仓库根目录下建立新的文件夹，以组长名字为文件夹名。每次作业为一个新的文件夹，文件夹名为 x (第 x 次实践），x 文件夹内部结构自由发挥（以后项目大了要再增加新的结构）
- commit push
- PR 到 https://github.com/SimplyY/web-front-end-thinking-tutorial

整个仓库的文件结构，大概像这样。

```
├── README.md
├── practice
│   └── yuwei
│       └── 1
│           └── anwser.js
└── tutorial
```

## 实践
> 1. 代码的编写应当首先让其他人能够读懂，其次才是让机器能够执行 ——sicp

> 2. 实践部分有第二次上课会讲的原型知识、this 知识，可以提前预习和充分利用谷歌、文档解决问题(以及这些题目都是常见的面试题)
> 3. 剩下的时间大家做一道题，然后按照之前讲的步骤 PR 过来

1. 将数字字符串:'123'转化为数字：123：
2. 使用Number函数将数字字符串数组：['1','2']转化为数字数组：[1,2]:
    ```js
    var array = ['1','2'];
    // TODO:
    ```
3. 将集合转化为真正的数组（提示：使用数组方法 slice、原型）
    ```js
    var childCollection = document.querySelectorAll('div');
    // TODO: 将集合转化为真正的数组
    var childs = ;
    ```
4. 写一个spacify函数，使得 `spacify('hello world') // 返回 'h e l l o w o r l d'`
5. 写一个函数，将英文字符串重新按照字母排序，比如 `cba` 返回 `abc`
7. `var a = ["a","b","c","d"]` 每过 1 秒 log 一下数组中的值
5. 定义log，然后它可以代理console.log的方法(使用apply)
6. 写出打印的输出
    ```js
    var User = {
        count: 1,

        getCount: function() {
            return this.count;
        }
    };

    console.log(User.getCount());

    var func = User.getCount;
    console.log(func());
    ```
