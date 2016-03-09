# css 进阶
## 玉伯论 html css 的重要性
https://github.com/lifesinger/blog/issues/105

让块元素水平居中。一般大家都会写成：

```css
.content {
    width: 980px;
    margin: 0 auto;
}
```

上面的代码能正常工作，大部分情况下也不会有问题，但上面的代码存在思维的懒惰。应该写成:
```css
.content {
    width: 980px;
    margin-left: auto;
    margin-right: auto;
}
```

看起来代码变多了，变啰嗦了。但如果你真经过思考，就会明白：

margin: 0 auto 中的 0 绝大部分情况下是冗余的，页面上早就有 reset.css 或 normalize.css 重置过
margin: 0 auto **不纯粹**，你要的是“水平居中”，却顺便把 top / bottom 给重置了
不纯粹会导致顺序和优先级的依赖，比如有另一处要给 margin-top/bottom 赋值时，就必须要提高优先级
进一步的东西是，我一直觉得CSS里，有一个重要的原则：

### **最小影响原则**

你在写某段CSS代码时，首先要非常清楚地知道这段CSS代码的功能，其次要尽量严格保障这段CSS代码只实现了你想要实现的功能。

这就如医生动手术，好好做好本分就行，千万别留下一个小镊子在病人身体里。

与HTML代码一样，对CSS代码来说，很重要的两个衡量标准也是稳定和灵活。

## BFC
### 来源
http://www.ido321.com/1642.html

### 什么是BFC
在一个Web页面的CSS渲染中，块级格式化上下文 (Block Fromatting Context)是按照块级盒子布局的。W3C对BFC的定义如下：

> 浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）。

为了便于理解，一个HTML元素要创建BFC，则满足下列的任意一个或多个条件即可

1. float的值不是none（浮动元素）。
2. position的值absolute or fixed
3. overflow 的值不是 visible(默认值)
4. display的值是 inline-block、table-cell、flex、table-caption或者inline-flex

BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。

#### BFC 与外边距折叠

> 在BFC中，每一个盒子的左外边缘（margin-left）会触碰到容器的左边缘(border-left)（对于从右到左的格式来说，则触碰到右边缘）。

因此，假如两相邻元素非别居于不同 BFC 中，那么他们不会存在外边距折叠。

#### 不折叠的情况

1. 浮动和绝对定位不与任何元素产生 margin 折叠
2. inline-block元素与其兄弟元素、子元素和父元素的外边距都不会折叠（包括其父元素和子元素）
