# koa 学习心得
## 前言
其实博客在今年年初的时候就打算用 koa 写的，不过没找到好用的 koa restful 库所以就作罢了。

讲道理 koa 给人的第一印象是 —— 远看挺神秘的。这次我要解开它的面纱。

## 学习资料
- 深入浅出ES6（三）：生成器 Generators http://www.infoq.com/cn/articles/es6-in-depth-generators
- co 函数库的含义和用法 http://www.ruanyifeng.com/blog/2015/05/co.html
- koa 中文文档 https://github.com/guo-yu/koa-guide
- 阮一峰 koa 教程 http://javascript.ruanyifeng.com/nodejs/koa.html

经过以上学习，我有了一些自己的心得，这里记下（基础知识就不赘述，上面的链接写的都很棒）

## 核心思想
### 中间件
**毫无疑问 koa 的最核心的内容就是 中间件** ,

![](http://7xkpdt.com1.z0.glb.clouddn.com/bea6522709e3aaafe08121a14dbcad34.png)


它基于：
- generator
- co (用于 generator 函数的自动执行)

**完美解决了异步组合问题，并解决了异步异常捕获问题**（并且 koa 框架在最外层 catch 了异常，应用不会因为异常而中断进程，所以不需要 forever 来重启应用）

### 异步异常捕获

可以把 `try { yield next }` 当成第一个中间件，如下，可以集中处理各个中间件抛出的异步错误。
```js
app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

app.use(function *(next) {
  throw new Error('some error');
})
```


## 源码分析
### 中间件

中间件的 实现上其实分三步：
1. middleware 内部调用 next
2. compose middleware
3. 使用 co wrap middleware，最后调用

这其实很像 `redux` 的中间件（我总感觉`redux` 中间件其实借鉴于 node 后端），通过 `next` 来调用下一个中间件，区别是一个用了 `generator` （所以有上图洋葱的 **回形针的执行流** ），而 `redux` 中间件则没用。

不过有趣的地方，middleware 最后被调用前 都用了 `compose`（其实这个概念来自函数式编程，将多个函数合并成一个函数）

koa-compose:

```js
function compose(middleware){
  return function *(next){
    if (!next) next = noop();

    var i = middleware.length;

    while (i--) {
      next = middleware[i].call(this, next);
    }

    yield *next;
  }
}

function *noop(){}
```

compose 后就是用 co，

```js
var fn = co.wrap(compose(middleware))
```
最后再调用。
```js
fn.call(ctx).catch(ctx.onerror);
```


值得注意的是前面这一行：

```js
var middleware = [respond].concat(this.middleware);
```
假如原来的 middleware 是 [S1, S2, S3], concat 就变成了 [respond, S1, S2, S3]

### respond
那么 respond 是干啥的呢？

真正处理HTTP请求的是下面这个 Generator 函数, 它会在 response 调用链尾调用 res.end。

res.end 的值就是 HTTP 请求最后的返回值，在 respond 函数里 它 其实是根据 res.body 值得类型来的

```
根据 api 我们知道 res.body 可能的类型

1. string：Content-Type 将默认设置为 text/html 或者 text/plain，默认字符集是 utf-8，Content-Length 也将一并设置
2. Buffer：Content-Type 将默认设置为 application/octet-stream，Content-Length 也将一并设置
3. Stream：Content-Type 将默认设置为 application/octet-stream
4. Object：Content-Type 将默认设置为 application/json 注意：默认的json返回会添加空格，如果你希望压缩json返回中的空格，可以这样配置：app.jsonSpaces = 0
```

```js
function *respond(next) {
  yield *next;

  // allow bypassing koa
  if (false === this.respond) return;

  var res = this.res;
  if (res.headersSent || !this.writable) return;

  var body = this.body;
  var code = this.status;

  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    this.body = null;
    return res.end();
  }

  if ('HEAD' == this.method) {
    if (isJSON(body)) this.length = Buffer.byteLength(JSON.stringify(body));
    return res.end();
  }

  // status body
  if (null == body) {
    this.type = 'text';
    body = this.message || String(code);
    this.length = Buffer.byteLength(body);
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' == typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  this.length = Buffer.byteLength(body);
  res.end(body);
}
```

### 其他
其他部分是 app、context、request、response 就不做详细介绍。其实 koa 内核非常精简，基于强大的 中间件机制 扩展能力强大。
