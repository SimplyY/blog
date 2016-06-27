# Thunk 函数、 co 、 async
> Thunk 函数其实就是多次柯里化函数的一个子集，只不过他多了一个要求：最后一次调用只接受回调函数作为参数，调用它将返回一个 thunkedFunction。

## Thunk 函数
我们再来谈一谈 Thunk 函数，它被广泛应用于 node 和 node 的 koa 框架上。

### js 语言的 Thunk 函数
这一节参考了的 阮一峰的 [es6教程](http://es6.ruanyifeng.com/#README) 里写的 [Thunk函数](http://es6.ruanyifeng.com/#docs/async#Thunk函数)

> 在 js 语言中，Thunk函数替换的是多参数函数，调用 Thunk 函数将其替换成单参数版本的函数（我们一般叫做 xxThunk 函数）并返回，且单参数版本函数的参数必须是回调函数。

js 语言的 thunk 和 原来的 thunk 函数有些区别，我们这里只讲 js 的 thunk 函数

比如对于 node 的 fs 模块

```js
var Thunk = function (fileName){
    return function (callback){
        return fs.readFile(fileName, callback);
    };
};

// Thunk函数的等价 es6 写法
let Thunk = fileName => callback => fs.readFile(fileName, callback)

// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var readFileThunk = Thunk(fileName);
readFileThunk(callback);

```

这里的 readFileThunk 就是 Thunk 后的单参数版本的函数。

我们可以看出， thunk 其实就是多次柯里化函数的一个子集，只不过他多了一个要求：最后一次调用只接受回调函数作为参数。

因为它其实也是柯里化函数，所以它也具有柯里化函数的功能
1. 可以惰性求值
2. 可以提前传递部分参数

> 你可能会问， Thunk函数到底怎么用？用在哪？回答是以前确实没什么很实用的地方，但是ES6有了Generator函数，Thunk函数现在可以用于Generator函数的自动流程管理。

著名的 tj 写的 co 就是基于 Thunk 来管理 Generator 函数的自动流程。



### Generator 函数的流程管理

这一节也参考了阮一峰的 [es6教程](http://es6.ruanyifeng.com/#README) 里的 [Generator-函数的流程管理](http://es6.ruanyifeng.com/#docs/async#Generator-函数的流程管理)


以读取文件为例。下面的Generator函数封装了两个异步操作。

```js
var fs = require('fs');
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);

var gen = function* (){
    var r1 = yield readFile('/etc/fstab');
    console.log(r1.toString());
    var r2 = yield readFile('/etc/shells');
    console.log(r2.toString());
};
```

虽然 generator 函数写起来还是很优雅的，但是如果简单的直接去调用的话，会很不优雅的（当初我第一遍学的时候，就因为调用的麻烦就学完基本不用了），如下：

```js
var g = gen();

var r1 = g.next();
r1.value(function(err, data){
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function(err, data){
        if (err) throw err;
        g.next(data);
    });
});
```

Thunk函数真正的威力，在于可以自动执行Generator函数。下面就是一个基于Thunk函数的Generator执行器。

```js
function run(fn) {
    var gen = fn();

    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }

    next();
}
```

然后执行只需要一行

```js
run(gen);
```

### co模块

```js
co(gen).then(function (){
    console.log('Generator 函数执行完成');
});
```

// TODO


### async 即将步入规范
更值得一说的是，co 的思想已经被纳入规范的草案 asycn 语法特性中，并且大家对 async 的期待完全不亚于箭头函数，虽然今年没进，但很快就步入规范。

如果对规范制定流程不清楚且有兴趣的，可以看下面简短介绍，详细的介绍请看原回答的图（详细版关键是那个图，不过那个图太长我就不放出来了）

>作者：张秋怡

>链接：https://www.zhihu.com/question/39993685/answer/84166978

>时间：2016-01-31

>来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

> 从 ES2016 开始，ECMAScript 标准的制定原则是 **成文标准要从事实标准中诞生**，**实现先于标准存在**，进入标准草案必须有 JavaScript 引擎实现的支持（按照流程，起码要 2 个 JavaScript 引擎的稳定实现，而主流常青浏览器里 JavaScript 引擎总共也才 4 个) + 社区里有充分的人气 + 足够的 test 262 测试。所以 ECMAScript 标准现在相当于事实标准的 Snapshot 而已 —— 到了每年年初的 deadline 有多少标准进了 Stage 4，就有多少标准进入当年的标准草案

> 拿题主说的 async 来说，没进到 Stage 4 原因是上次 TC39 开会的时候只有 Chakra 和 Babel 有实现（SpiderMonkey 快了，但是当时遇到了一些问题），而且还没有写 test 262 测试……按照标准是不可以进下一步的。虽然现在 V8 和 SpiderMonkey 里的 async 也快 land 了（别忘了 JS 引擎现在都是 6 周发一版），test 262 测试也在写了，不过没赶上这个月底 TC39 开会的议程，下一次 TC39 开会是 3 月底，而今年的 deadline 是 1 月 28 日……赶不上 deadline 了，等明年吧

The TC39 categorises proposals into 4 stages:

- stage-0 - Strawman: just an idea, possible Babel plugin.
- stage-1 - Proposal: this is worth working on.
- stage-2 - Draft: initial spec.
- stage-3 - Candidate: complete spec and initial browser implementations.
- stage-4 - Finished: will be added to the next yearly release.

async 在今年年初就已经进入 stage-3，并且基本上是最受期待的 新语法特性之一，所以明年年初进入 stage 4 规范八九不离十，所以还没学的，抽个空学一学呗，很多地方已经大规模使用了。
