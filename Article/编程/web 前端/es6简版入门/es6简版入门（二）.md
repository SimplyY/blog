发布时间：2016-01-06
更新时间：2016-01-06 13:24:31
[github 本博客项目](https://github.com/SimplyY/Blog/)
# es6简版入门（二）

## 数组的扩展
### Array.from()
Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。

> 注：后面我们还会学到 `列表推导` 和 `扩展运算符` 这俩也都可以用数组 A 生成数组 B，而且写起来很方便，但是他们所依赖的源 A 必须是可遍历的，也就是说对于 **类似数组的对象** **只有** Array.from 能以它生成数组。

下面是一个类似数组的对象，Array.from将它转为真正的数组。

    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };

    // ES5的写法
    var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

    // ES6的写法
    let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。

    // NodeList对象
    let ps = document.querySelectorAll('p');
    Array.from(ps).forEach(function (p) {
      console.log(p);
    });

    // arguments对象
    function foo() {
      var args = Array.from(arguments);
      // ...
    }


上面代码中，querySelectorAll方法返回的是一个类似数组并且实现了 Iterator 接口的对象，但只有将这个对象转为真正的数组，才能使用 Array 的 forEach方法。

    Array.from('hello')
    // ['h', 'e', 'l', 'l', 'o']

    let namesSet = new Set(['a', 'b'])
    Array.from(namesSet) // ['a', 'b']

上面代码中，字符串和Set结构都具有Iterator接口，因此可以被Array.from转为真正的数组。


Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

    Array.from(arrayLike, x => x * x);
    // 等同于
    Array.from(arrayLike).map(x => x * x);

    Array.from([1, 2, 3], (x) => x * x)
    // [1, 4, 9]

> 注: => 为箭头函数， x => x * x 等价于 function(x){ return x*x; }

下面的例子是取出一组DOM节点的文本内容。

    let spans = document.querySelectorAll('span.name');

    // map() es5 way
    let names1 = Array.prototype.map.call(spans, s => s.textContent);

    // Array.from() es6 way
    let names2 = Array.from(spans, s => s.textContent)

> 注：其实还可以传第三个参数，作为绑定第二个参数的 this。

> from MDN:
> Syntax: Array.from(arrayLike[, mapFn[, thisArg]])
> thisArg Optional. Value to use as this when executing mapFn.

> 看 MDN 的秘诀对于函数的参数列表中的， []符号，是指可缺省的意思。也就是[]里的内容是可选参数，然而视觉上不爽的是，“，”也在 []里面。


Array.from()可以将各种值转为真正的数组，并且还提供map功能。这实际上意味着，只要有一个原始的数据结构，你就可以先对它的值进行处理，然后转成规范的数组结构，进而就可以使用数量众多的数组方法。

    Array.from({ length: 2 }, () => 'jack')
    // ['jack', 'jack']

上面代码中，Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。


### Array.of()
Array.of方法用于将一组值，转换为数组。

    Array.of(3, 11, 8) // [3,11,8]
    Array.of(3) // [3]
    Array.of(3).length // 1

这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。

    Array() // []
    Array(3) // [, , ,]
    Array(3, 11, 8) // [3, 11, 8]

上面代码中，Array方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于2个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。

Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。

    Array.of() // []
    Array.of(undefined) // [undefined]
    Array.of(1) // [1]
    Array.of(1, 2) // [1, 2]

Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。

## 数组实例的copyWithin()
数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

    Array.prototype.copyWithin(target, start = 0, end = this.length)

它接受三个参数。

- target（必需）：从该位置开始替换数据。
- start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

这三个参数都应该是数值，如果不是，会自动转为数值。

    [1, 2, 3, 4, 5].copyWithin(0, 3)
    // [4, 5, 3, 4, 5]

上面代码表示将从3号位直到数组结束的成员（4和5），复制到从0号位开始的位置，结果覆盖了原来的1和2。

下面是更多例子。

    // 将3号位复制到0号位
    [1, 2, 3, 4, 5].copyWithin(0, 3, 4)
    // [4, 2, 3, 4, 5]

    // -2相当于3号位，-1相当于4号位
    [1, 2, 3, 4, 5].copyWithin(0, -2, -1)
    // [4, 2, 3, 4, 5]

## 数组实例的find()和findIndex()
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。

    [1, 4, -5, 10].find((n) => n < 0)
    // -5

上面代码找出数组中第一个小于0的成员。

    [1, 5, 10, 15].find(function(value, index, arr) {
      return value > 9;
    }) // 10

上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

    [1, 5, 10, 15].findIndex(function(value, index, arr) {
      return value > 9;
    }) // 2

这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。


## 数组实例的fill()
fill方法使用给定值，填充一个数组。

    ['a', 'b', 'c'].fill(7)
    // [7, 7, 7]

    new Array(3).fill(7)
    // [7, 7, 7]

上面代码表明，fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。

fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

    ['a', 'b', 'c'].fill(7, 1, 2)
    // ['a', 7, 'c']

上面代码表示，fill方法从1号位开始，向原数组填充7，到2号位之前结束。

### 数组实例的entries()，keys()和values()
ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

    for (let index of ['a', 'b'].keys()) {
      console.log(index);
    }
    // 0
    // 1

    for (let elem of ['a', 'b'].values()) {
      console.log(elem);
    }
    // 'a'
    // 'b'

    for (let [index, elem] of ['a', 'b'].entries()) {
      console.log(index, elem);
    }
    // 0 "a"
    // 1 "b"

如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。

    let letter = ['a', 'b', 'c'];
    let entries = letter.entries();
    console.log(entries.next().value); // [0, 'a']
    console.log(entries.next().value); // [1, 'b']
    console.log(entries.next().value); // [2, 'c']

### 数组实例的includes()
> MDN: var boolean = array.includes(searchElement[, fromIndex])

Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持。

    [1, 2, 3].includes(2);     // true
    [1, 2, 3].includes(4);     // false
    [1, 2, NaN].includes(NaN); // true

该方法的第二个参数表示搜索的起始位置


### 数组的空位
> 注：关于空位，可以直接跳过，牢记 **所以建议避免出现空位。** 就行，下面是解释，有兴趣可以看看，反正我现在只记得一句“**所以建议避免出现空位。** ”。。。

数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。

    Array(3) // [, , ,]

上面代码中，Array(3)返回一个具有3个空位的数组。

注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。

    0 in [undefined, undefined, undefined] // true
    0 in [, , ,] // false

ES5对空位的处理，已经很不一致了，大多数情况下会 **忽略空位**。

ES6则是明确将空位转为undefined。

Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。

fill()会将空位视为正常的数组位置。

for...of循环,entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。由于空位的处理规则非常不统一，**所以建议避免出现空位。**


### 数组推导
> 注：非常有用的特性

数组推导（array comprehension）提供简洁写法，允许直接通过现有数组生成新数组。这项功能本来是要放入ES6的，但是TC39委员会想继续完善这项功能，让其支持所有数据结构（内部调用iterator对象），不像现在只支持数组，所以就把它推迟到了ES7。Babel转码器已经支持这个功能。

    var a1 = [1, 2, 3, 4];
    var a2 = [for (i of a1) i * 2];

    a2 // [2, 4, 6, 8]

上面代码表示，通过for...of结构，数组a2直接在a1的基础上生成。

注意，数组推导中，for...of结构总是写在最前面，返回的表达式写在最后面。

for...of后面还可以附加if语句，用来设定循环的限制条件。

    var years = [ 1954, 1974, 1990, 2006, 2010, 2014 ];

    [for (year of years) if (year > 2000) year];
    // [ 2006, 2010, 2014 ]

上面代码表明，if语句要写在for...of与返回的表达式之间，而且可以多个if语句连用。

数组推导可以替代map和filter方法。

    [for (i of [1, 2, 3]) i * i];
    // 等价于
    [1, 2, 3].map(function (i) { return i * i });

    [for (i of [1,4,2,3,-8]) if (i < 3) i];
    // 等价于
    [1,4,2,3,-8].filter(function(i) { return i < 3 });

上面代码说明，模拟map功能只要单纯的for...of循环就行了，模拟filter功能除了for...of循环，还必须加上if语句。

由于字符串可以视为数组，因此字符串也可以直接用于数组推导。

    [for (c of 'abcde') if (/[aeiou]/.test(c)) c].join('') // 'ae'

    [for (c of 'abcde') c+'0'].join('') // 'a0b0c0d0e0'

上面代码使用了数组推导，对字符串进行处理。

数组推导需要注意的地方是，新数组会立即在内存中生成。这时，如果原数组是一个很大的数组，将会非常耗费内存。


## 函数的扩展
### 函数参数的默认值

    function Point(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }

    var p = new Point();
    p // { x: 0, y: 0 }

#### 与解构赋值默认值结合使用
参数默认值可以与解构赋值的默认值，结合起来使用。

    function foo({x, y = 5}) {
      console.log(x, y);
    }

    foo({}) // undefined, 5
    foo({x: 1}) // 1, 5
    foo({x: 1, y: 2}) // 1, 2

#### 参数默认值的位置
通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

    function f(x = 1, y) {
      return [x, y];
    }

    f() // [1, undefined]
    f(2) // [2, undefined])
    f(, 1) // 报错
    f(undefined, 1) // [1, 1]

### 函数的length属性
指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。

    (function(a){}).length // 1
    (function(a = 5){}).length // 0
    (function(a, b, c = 5){}).length // 2

### rest参数
ES6引入rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

    function add(...values) {
      let sum = 0;

      for (var val of values) {
        sum += val;
      }

      return sum;
    }

    add(2, 5, 3) // 10

上面代码的add函数是一个求和函数，利用rest参数，可以向该函数传入任意数目的参数。


### 扩展运算符
#### 含义
扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。

    console.log(...[1, 2, 3])
    // 1 2 3

    console.log(1, ...[2, 3, 4], 5)
    // 1 2 3 4 5

    [...document.querySelectorAll('div')]
    // [<div>, <div>, <div>]

该运算符主要用于函数调用。

    function push(array, ...items) {
      array.push(...items);
    }

    function add(x, y) {
      return x + y;
    }

    var numbers = [4, 38];
    add(...numbers) // 42


#### 替代数组的apply方法
由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。

    // ES5的写法
    function f(x, y, z) {
      // ...
    }
    var args = [0, 1, 2];
    f.apply(null, args);

    // ES6的写法
    function f(x, y, z) {
      // ...
    }
    var args = [0, 1, 2];
    f(...args);

下面是扩展运算符取代apply方法的一个实际的例子，应用Math.max方法，简化求出一个数组最大元素的写法。

    // ES5的写法
    Math.max.apply(null, [14, 3, 77])

    // ES6的写法
    Math.max(...[14, 3, 77])

    // 等同于
    Math.max(14, 3, 77);

> 注这里的优点是，当 14, 3, 77 这三个数据的结构 **是数组** 的时候，**es5 只能用 apply**，es6 就不需要用 apply 了（其实和第一个例子优点相同。


#### 扩展运算符的应用
##### （1）合并数组

    扩展运算符提供了数组合并的新写法。

    // ES5
    [1, 2].concat(more)
    // ES6
    [1, 2, ...more]

    var arr1 = ['a', 'b'];
    var arr2 = ['c'];
    var arr3 = ['d', 'e'];

    // ES5的合并数组
    arr1.concat(arr2, arr3));
    // [ 'a', 'b', 'c', 'd', 'e' ]

    // ES6的合并数组
    [...arr1, ...arr2, ...arr3]
    // [ 'a', 'b', 'c', 'd', 'e' ]

##### （2）与解构赋值结合

扩展运算符可以与解构赋值结合起来，用于生成数组。

    // ES5
    a = list[0], rest = list.slice(1)
    // ES6
    [a, ...rest] = list

> 注：然后 slice 用处不大了，有了扩展运算符后


##### （3）字符串

扩展运算符还可以将字符串转为真正的数组。

    [...'hello']
    // [ "h", "e", "l", "l", "o" ]

##### （4）实现了Iterator接口的对象

任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。包括 Map 和 Set 结构，Generator 函数。

    var nodeList = document.querySelectorAll('div');
    var array = [...nodeList];

#### name属性
函数的name属性，返回该函数的函数名。

    function foo() {}
    foo.name // "foo"

如果将一个匿名函数赋值给一个变量，ES5的name属性，会返回空字符串，而ES6的name属性会返回实际的函数名。

    var func1 = function () {};

    // ES5
    func1.name // ""

    // ES6
    func1.name // "func1"

### 箭头函数
#### 基本用法
ES6允许使用“箭头”（=>）定义函数。

    var f = v => v;

上面的箭头函数等同于：

    var f = function(v) {
      return v;
    };

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

    var f = () => 5;
    // 等同于
    var f = function (){ return 5 };

    var sum = (num1, num2) => num1 + num2;
    // 等同于
    var sum = function(num1, num2) {
      return num1 + num2;
    };

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。

    var sum = (num1, num2) => { return num1 + num2; }

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。

    var getTempItem = id => ({ id: id, name: "Temp" });


#### 使用注意点
箭头函数有几个使用注意点。

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作Generator函数。

上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

    function foo() {
       setTimeout( () => {
          console.log("id:", this.id);
       },100);
    }

    foo.call( { id: 42 } );
    // id: 42

上面代码中，setTimeout的参数是一个箭头函数，100毫秒后执行。如果是普通函数，执行时this应该指向全局对象，但是箭头函数导致this总是指向函数所在的对象。

### 函数绑定
箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法（call、apply、bind）。但是，箭头函数并不适用于所有场合，所以ES7提出了“函数绑定”（function bind）运算符，用来取代call、apply、bind调用。虽然该语法还是ES7的一个提案，但是Babel转码器已经支持。

函数绑定运算符是并排的两个双冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

    foo::bar;
    // 等同于
    bar.bind(foo);

    foo::bar(...arguments);
    // 等同于
    bar.apply(foo, arguments);

    const hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasOwn(obj, key) {
      return obj::hasOwnProperty(key);
    }

如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。

    var method = obj::obj.foo;
    // 等同于
    var method = ::obj.foo;

### 尾调用优化

对于其他支持“尾调用优化”的语言（比如Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。
