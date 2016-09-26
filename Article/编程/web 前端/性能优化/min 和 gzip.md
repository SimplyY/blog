# min gzip
关于前端性能优化, 推荐 [高性能网站建设指南](http://book.douban.com/subject/3132277/)

min 是 webpack 做的（也就是所谓的自动），我发现很多人弄混了前端 min gzip 的意义，我这里写写。

min 不叫压缩，叫混淆或者精简，比方说把函数名 test 精简 为 a ，所有代码全部变成一行，这样代码体积就小了。一般由自动化工具完成。

压缩一般用 gzip ，是编码行为，我们熟悉的有霍夫曼编码（可以压缩体积），是后端完成的。服务器端响应 http 请求的时候，可以把 response 的内容用 gzip 压缩，然后设置 header 的 Content-Encoding:gzip ，浏览器看到这个 header 后，就会去用 gzip 的方式解压。
