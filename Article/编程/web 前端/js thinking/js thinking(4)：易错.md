# js thinking(4)：易错
## indexOf 判断元素是否在数组的缺陷
`array.indexOf(item) !== -1 `

不能对多维数组、对象数组来判断元素是否在数组里。
因为它会对对象进行`===`判断。即便对象的值一样，但是对象的内存地址不一样，`array.indexOf(item)` 会总是返回-1

解决办法

    // element can be Object, Strin

    g, Number etc
    function isInArray(element, array) {
        for (var i = 0; i < array.length; i++) {
            if (JSON.stringify(element) === JSON.stringify(array[i])) {
                return true;
            }
        }
        return false;
    }

    // test performance

    var element = [1,2,3,4,5,6,2];
    var t0 = performance.now();
    JSON.stringify(element);
    var t1 = performance.now();
    console.log(t1-t0);

    // 当 element 为简单数据类型时，JSON.stringify(element);性能很高（element 为100长度的字符串时，0.01毫秒）
    // 注意，当 element 为数组的 length 大于10000 时，JSON.stringify(element);性能会开始变低（大于0.01秒），但是绝大多数情况不会大于这么多，所以还是在需要性能优化的时候再性能优化。


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
