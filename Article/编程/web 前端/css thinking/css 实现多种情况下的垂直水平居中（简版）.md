# css 实现多种情况下的垂直水平居中（简版）
参考文章 http://www.w3cplus.com/css/vertically-center-content-with-css

大漠写的比较细，我写个简版的介绍。

> 首先是我之前一直没意识到的，我以前总是以为会一种就行了，写写自己项目确实足够，但是写真正的应用远远不够。

## 垂直居中

### 单行固定高度垂直居中
**元素内容是单行，并且其高度是固定不变的**，你只要将其“line-height”设置成和“height”值一样就Ok了

```html
<div class="vertical">content</div>
```
```css
.vertical {
	height: 100px;
	line-height: 100px;/*值等于元素高度的值*/
}
```

限制条件：内容单行，高度固定

### 多行固定高度垂直居中
给容器设置绝对定位（position:absolute）,并且定位高度（top:50%）和margin-top为高度的一半（margin-top:-height/2）。

```html
<div class="vertical">content</div>
```

```css
.vertical {
	height: 100px;/*元素的高度*/
	position: absolute;
	top: 50%;/*元素的顶部边界离父元素的的位置是父元素高度的一半*/
	margin-top: -50px;/*设置元素顶边负边距，大小为元素高度的一半*/
}
```

当内容高度高于设置的高度的时候，会出现难看的滚动条。

> 这种办法的原理同样也可以用于水平居中。后面讲。

### div模拟表格效果（自适应高度，支持行内元素）

> 同样原理可以用于水平居中

将多个<div>的“display”属性设置为“table”和“table-cell”，并设置他们的“vertical-align”的属性值为“middle”

vertical-align 详细介绍：The vertical-align CSS property specifies the vertical alignment of an inline or table-cell box. (注意 **inline 元素也行，前两种方法均不可以使 inline 元素居中** )

非常有用的属性（实习第三天，师兄说我，你竟然连这个都不知道= =）

```html
<div id="container">
	<div id="content">content</div>
</div>
```

```css
#container {
	height: 300px;
	display: table; /*让元素以表格形式渲染*/
}
#content {
	display:table-cell;/*让元素以表格的单元素格形式渲染*/
	vertical-align: middle;/*使用元素的垂直对齐*/
}
```

> 目前就写这么多吧，

## 水平居中
### 使用 margin: auto(固定宽度值)
```html
<div class="horizontal">content</div>
```

```css
.horizontal {
    width: 200px;
    margin: 0 auto;
}
```
缺陷：元素需要有一个固定宽度值

### 绝对定位配合负的margin
同垂直居中原理

```html
<div class="horizontal">content</div>
```

```css
.horizontal {
    width: 960px;
    position: absolute;
    left: 50%;
    margin-left: -480px;/*此值等于“-width/2”*/
}
```

缺陷：其一要有一个固定宽度，其二对要居中的元素进行绝对定位，其三还需要在其父元素(如果有)上设置一个相对定位“position: relative”。

### text-align:center 让元素水平居中
The text-align CSS property describes how inline content like text is aligned in its parent block element. text-align does not control the alignment of block elements, only their inline content.

**注意是在容器里加这个属性，且对块级元素无效(所有直接子元素都必须不是块级元素)。**

```html
<div class="container">
    <img src="http://cdn2.w3cplus.com/cdn/farfuture/kjp_QAYKlGIQlwtbqga2ZA_t3kt5JqbddjbyHIMm9kU/mtime:1397811294/sites/default/files/w3cplus-weixin.jpg" alt="" />
</div>
```

```css
.example {
    border: solid;
}

.container {
    text-align: center;
    height: 500px;
    width: 500px;
    border: solid;
}

```

https://jsfiddle.net/L94ve98d/
