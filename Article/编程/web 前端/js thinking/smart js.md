# smart js

## 全局变量
容易造成 bug、且难以 debug。解决办法:使用闭包

    (function(window, document, undefined) {
        // body...
    })(window, document);

### for in
> 防止迭代原型链的写法

    for (var myVar in object) {
        if (object.hasOwnProperty(myVar)) {

        }
    }


### 给类型添加方法

    Number.prototype.integer = function () {
        return xxx;
    }

### 不要分号
jshint 插件设置，不要分号，头部加上

    /* jshint asi:true */
