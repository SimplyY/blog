# smart js

## 全局变量
容易造成 bug、且难以 debug。解决办法:使用闭包

```js
(function(window, document, undefined) {
    // body...
})(window, document);
```

### for in
> 防止迭代原型链的写法

```js
for (var myVar in object) {
    if (object.hasOwnProperty(myVar)) {

    }
}
```

### 不要分号
jshint 插件设置，不要分号，头部加上

```js
/* jshint asi:true */
```


### encode html

```js
function replaceTag(tag) {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };

    return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
}
```

## 异步
### 使用 promise 来异步操作
- Promise/A+规范(中文) https://segmentfault.com/a/1190000002452115
- alloyteam http://www.alloyteam.com/2014/05/javascript-promise-mode/

依照 Promise/A+ 的定义，
> Promise表示一个异步操作的最终结果。

![](http://7xkpdt.com1.z0.glb.clouddn.com/57f886ce0b2cbfdc54ba33b6a5269dd1.png)


Promise 对象用来进行延迟(deferred) 和异步(asynchronous ) 计算。

#### Promise 的构造函数
构造一个 Promise，最基本的用法如下：

```js
var promise = new Promise(function(resolve, reject) {
    if (...) {  // succeed
        resolve(result);
    } else {   // fails
        reject(Error(errMessage));
    }
});
```

#### Promise.then
Promise 实例拥有 then 方法（具有 then 方法的对象，通常被称为 thenable）。它的使用方法如下：

```js
// return promise
promise.then(onFulfilled, onRejected)
```

### 异步 api 串行

即将此 promise 作为 then 的返回值，因此就可以做到对异步 api（支持 promise 的，即返回 promise）进行串行处理。

比方说

```js
// promiseApix return promise
promiseApi1()
    .then(dealData1)
    .then(promiseApi2)
    .then(dealData2)
```

此法通常可以用来延迟加载（首页只下载 mustData，下载完成后再下载其他的 data）

多说几句，promiseApi1 实际上就是一个函数，它的返回值是一个 promise 对象（很多 提供 ajax 操作的类库都是支持，比方说最新版的 jq 的 ajax 函数就可以返回一个 promise）

示例
```js
$.ajax('https://www.zhihu.com/')
    .then(function(data){
        console.log(data)
    })
    .then(function(){
        return $.ajax('https://www.zhihu.com/people/SimplyY')
    })
    .then(function(data){
        console.log(data)
    })
```

之所以和上面不一样，没有传递函数作为 then 的参数，是因为 ajax 方法需要 url 参数，其实你可以对 ajax 请求封装一层函数（并且函数没有参数），然后在函数里面 return 一个 promise 即可。

示例
```js
function loadMustData() {
    return new Promise((resolve, reject) => {
        $.ajax('https://www.zhihu.com/people/SimplyY')
            .then(function(data) {
                resolve(data)
            })
    })
}

$.ajax('https://www.zhihu.com/')
    .then(function(data){
        console.log(data)
    })
    .then(loadMustData)
    .then(function(data){
        console.log(data)
    })

```

### 异步 api 并行
附送并行代码

```js
Promise.all(promiseApi1(), promiseApi2())
    .then(datas => {
        let [data1, data2] = datas
        // do something deal data
    })

```
