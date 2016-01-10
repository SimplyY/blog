发布时间：2015-12-26
更新时间：2015-12-26 17:37:40
[github 本博客项目](https://github.com/SimplyY/Blog/)

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
