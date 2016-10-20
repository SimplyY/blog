# promise 数组的异步串行

我们知道普通的异步串行

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

但假如串行异步请求数量很多，比如十个，难道我们要十多个 then？

所以我们第一反应就是循环

## for 版本

```js
// tasks is (async request)array
function recordValue(results, value) {
    results.push(value);
    return results;
}
// [] 用来保存初始化值
var pushValue = recordValue.bind(null, []);
// 返回promise对象的函数的数组
var promise = Promise.resolve();
// 开始的地方
for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    promise = promise.then(task).then(pushValue);
}
```

## reduce 版本

```js
// tasks is (async request)array
function sequenceTasks(tasks) {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }

    var pushValue = recordValue.bind(null, []);

    return tasks.reduce(function (promise, task) {
        return promise.then(task).then(pushValue);
    }, Promise.resolve());
}
```

当需求不同时可能写法有改变。

这里的情况是 多个异步请求串行完成后 最后返回所有异步请求的结果（存到了results数组里面），但有时候异步数组任务前后有依赖关系，不需要异步请求的结果。

不过原理都是一样的。
