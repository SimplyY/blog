## indexOf 判断元素是否在数组的缺陷
`array.indexOf(item) !== -1 `

不能对多维数组、对象数组来判断元素是否在数组里。
因为它会对对象进行`===`判断。即便对象的值一样，但是对象的内存地址不一样，`array.indexOf(item)` 会总是返回-1

解决办法

    // element can be Object, String, Number etc
    function isInArray(element, array) {
        for (var i = 0; i < array.length; i++) {
            if (JSON.stringify(element) === JSON.stringify(array[i])) {
                return true;
            }
        }
        return false;
    }
