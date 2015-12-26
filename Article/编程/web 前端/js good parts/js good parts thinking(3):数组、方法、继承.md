发布时间：2015-11-14
更新时间：2015-12-26 17:37:40
[github 本博客项目](https://github.com/SimplyY/Blog/)
[github 本博客项目](https://github.com/SimplyY/Blog/)
# js good parts thinking(3):数组、方法、继承

## 数组
数组不少坑。
### 不要设置长度
1. length 值为数组最大整数属性名加上1
2. 设置比元素数量大的 length 不会为数组分配更大空间，小的会删除大下标。

**推荐只读 length 值，不要设置 length 值。应该通过变异方法间接更改 length 的值**

### 不要用 delete
应该使用

    array.splice(begin, deleteCount);
#### 删除数组中的元素
![](http://7xkpdt.com1.z0.glb.clouddn.com/ce099953100f3ee0a897872d1e58bfd7.png)

## 方法
### Array
#### array.concat(item...)
返回一个新数组，[array, items]。其中 item 可以是数组，也就是可以用来拼接数组.

    var a = [1,2]
    var b = [1,2]
    var a.concat(b) //[ 1, 2, 1, 2 ]


注意：
> MDN: concat does not **alter** this or any of the arrays provided as arguments but instead returns a shallow copy **that contains copies of the same elements combined from the original arrays**. Elements of the original arrays are copied into the new array as follows:
- Object references (and not the actual object): concat copies object references into the new array. Both the original and new array refer to the same object. That is, if a referenced object is modified, the changes are visible to both the new and original arrays.
- Strings and numbers (not String and Number objects): concat copies the values of strings and numbers into the new array.


总的来说
1. concat 不会修改 array 和 item
2. 并且尤为重要的是对于数组的浅复制不是针对于数组对象，而是数组包含的元素。

#### array.join(separator)
将数组构造成字符串，以 separator 分隔，separator 默认为','

#### array.slice
slice: 切片
返回数组中的一部分的浅复制，也是只对数组中的元素进行浅复制
##### 得到数组最后一个元素
如果 array 的 element 为简单数据类型，则 array.slice(-1)[0] === array[array.length - 1]
```
Array.prototype.getLastElement = function () {
    return this.slice(-1)[0];
};
```

### array.变异方法
所谓变异方法，就是会更改原 array。有 push,pop,reverse,shift,unshift,sort(内部用了快排，不稳定排序),splice(),等（map，es6+）
#### array.splice(start, deleteCount, items...)
splice: 拼接
deleteCount默认为 max（如果不传参数），即 start 之后全部 delete 掉

- 返回值数组为，array[start, start + deleteCount - 1] , 即start 之后到 start + deleteCount 之前为。
- **此方法会改变原数组**，原数组会变成，array[0, start -1] + items + array[start + deleteCount, end] , 即连接了 start 之前的数组和 items 和start + deleteCount之后的数组，
xxx 之前： array[xxx] 前，不包括array[xxx]，xxx即为 end
xxx 之后： array[xxx] 后，包括array[xxx]，xxx 即为 begin

注意：所有 begin,start 都是包括的，所有 end 都是不包括的，类比 for 循环的起始条件和终止条件。
口诀：函数传参，**包括起点不包括终点**（最好背下来）。



### Number
#### number.toExponential(fractionDigits)
返回数字转化为指数形式的字符串,fractionDigits 指定小数位数，不更改number 的值

#### number.toFixed(fractionDigits)
返回转化为指定小数精度的十进制形式的字符串

![](http://7xkpdt.com1.z0.glb.clouddn.com/d0efde181a3822a9805363ccfecf0c02.png)
注意参数为整个数字的位数。

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

## 继承
TODO
