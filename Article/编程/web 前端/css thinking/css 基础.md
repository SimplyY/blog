# css 基础

## 来源
[css 设计指南](http://book.douban.com/subject/23123255/)

## HTML

### 文本用闭合标签

闭合标签的基本格式如下:<标签名>文本内容</标签名>

比如

```html
<h1>Words by Dogsworth</h1>
<p>I wandered lonely as a dog.</p>
```

### 引用内容用自闭合标签
浏览器会在 HTML 页面加载的时候，额外向服务器发送请求，以取得自闭 合标签引用的内容。

下面就是使用自闭合标签标记的一张图片。

```html
<img src="images/cisco.jpg" alt="My dog Cisco" />
```

对于自闭合标签，XHTML 要求必须这样写:
```html
<img src="images/cisco.jpg" alt="My dog Cisco" />
```
而在 HTML5 中，可以省略最后那个表示关闭的斜杠，写成:
```html
<img src="images/cisco.jpg" alt="My dog Cisco" >
```
不过，我还是习惯于给自闭合标签的末尾也加上一个空格和斜杠。HTML5 会忽略这个斜杠，而 我在检查代码结构时，通过它一眼就能知道 **这个标签已经关闭了**，所以它不包含后面的标签。

### section
只有元素内容会被列在 **文档大纲** 中时，才适合用section元素。

这里的文档大纲更像是提纲，section 就是提纲中的不重复项（比如对于博文 list，整个 list 才属于一个 section）

### 块级元素和行内元素
- 块级元素盒子会扩展到与父元素同宽
明确设定 width 属性后，块级元素就不会再扩展到与父元素(即 body)同宽了。没有设定 width，值为 auto。
- 行内元素盒子会“收缩包裹”其内容，并且会尽可能包紧。

## 选择符
### 后代选择符
标签 1 标签 2 {声明}

是其祖先元素(**不一定是父元素**)的情况下才会被选中。

### 子选择符>
标签 1 > 标签 2

标签 1 **必须是标签 2 的父元素**，标签 1 不能是标签 2 的父元素之外的其他 祖先元素。

### 紧邻同胞选择符+
标签 1 + 标签 2

标签 2 必须紧跟在其同胞标签 1 的后面。

### 一般同胞选择符~
标签 1 ~ 标签 2

标签 2 在其同胞标签 1 后面(不一定紧跟)。

### 标签带类选择符
```css
p.specialtext {color:red;}
```

只选择带 specialtext 类的段落。像这样组合标签 名和类选择符，可以让你更精确地选择特定的标签。

### 多类选择符
```html
<p class="specialtext featured"></p>
```

选择同时存在这两个类名的元素，可以这样写:
.specialtext.featured {font-size:120%;}

注意，CSS 选择符的两个类名之间没有空格，因为我们只想选择同时具有这两个类
名的那个元素。如果你加了空格，那就变成了“祖先/后代”关系的上下文选择符了。

只用一个 class 属性，但给它设定多个值，达到组合的效果。

### 属性名选择符
标签名[属性名] 选择任何带有属性名的标签名。

比如，下面的 CSS

img[title] {border:2px solid blue;}

会导致像下面这个带有 title 属性的 HTML img 元素显示 2 像素宽的蓝色边框

### 属性值选择符
标签名[属性名="属性值"]

## 伪类
- UI伪类会在 HTML 元素处于某个状态时(比如鼠标 指针位于链接上)，为该元素应用 CSS 样式。
- 结构化伪类会在标记中存在某种结构上的关系时(如某个元素是一组元素中的第一个或最后一个)，为相应元素应用 CSS 样式。

### UI伪类
1. 链接伪类(link 未被点，visited 已被点，hover 鼠标悬停，active 正在被点)
2. :focus 伪类 表单中的文本字段在用户单击它时会获得焦点，获得焦点时使用 css 样式。
3. :target 伪类，用户点击一个指向页面中其他元素的链接。常用于页面内跳转里，来显示跳转到的位置，使用举例

```html
<a href="#more_info">More Information</a>
```
位于页面其他地方、ID 为 more_info 的那个元素就是目标。该元素可能是这样的:
```html
<h2 id="more_info">This is the information you are looking for.</h2>
```
那么，如下 CSS 规则
```css
#more_info:target {background:#eee;}
```
会在用户单击链接转向 ID 为 more_info 的元素时，为该元素添加浅灰色背景。

## 伪元素
1. ::first-letter 伪元素
```css
p::first-letter {font-size:300%;}
```
可以得到段落首字符放大的效果。
2. ::first-line 伪元素
3. ::before 和::after 伪元素
以下标记
```html
<p class="age">25</p>
```
和如下样式
```css
p.age::before {content:"Age: ";}
p.age::after {content:" years.";}
```
Age: 25 years.

## 继承
CSS 中的祖先 元素也会向后代传递一样东西:CSS 属性的值。

CSS 中有很多属性是可以继承的，其中相当一部分都 **跟文本有关**，比如颜色、字体、 字号。

然而，也有很多 CSS 属性不能继承，因为继承这些属性没有意义。这些不能 继承的属性主要涉及 **元素盒子的定位和显示方式** ，比如边框、外边距、内边距

## 层叠
层叠，就是层叠样式表中的层叠，是一种样式在文档层次中逐层叠加的过程。

### 样式来源

1. 浏览器有一个默认的样式表
2. 用户样式表
3. 链接样式
4. 嵌入样式
5. 行内样式

### 层叠规则
1. 按照样式来源顺序和权重 **排序**。
2. 按特指度排序。
3. 顺序决定权重。如果两条规则都影响某元素的同一个属性，特指度也相同，则位置最靠下(或后声明)的规则胜出。


### 计算特指度
对每个选择符都要按下面的“ICE”公式计算三个值:

ICE 并非真正的三位数
 0-1-12 与 0-2-0 相比，仍然是 0-2-0 的特指度更高。

##􏰈􏰉􏰊􏰋􏰈􏰉 定位元素
### 理解盒模型
每一个元素都会在页面上生成一个盒子。因此，HTML 页面实际上就是由一堆盒子组成的。

#### 重置样式表
```css
* {margin:0; padding:0;}
```

#### box-sizing
```css
* {box-sizing: border-box}
```

The width and height properties include the padding and border， but not the margin.

尺寸计算公式：width = border + padding + 内容的宽度，height = border + padding + 内容的高度。

### 浮动和清除
浮动，你看这俩字儿多形象，意思就是把元素从常规文档流中拿出来。

拿出 来干什么?一是可以实现传统出版物上那种文字绕排图片的效果，二是可以让原来 上下堆叠的块级元素，变成左右并列，从而实现布局中的分栏。

当你浮动一个元素的时候......这些(浮动)规则就好像 在说:‘尽量把这个元素往上放，能放多高放多高，直到碰到某个元素的边界为 止。’”

#### 文本绕排图片
```html
<img ...... />
<p>...the paragraph text...</p>
```

```css
/*为简明起见，省略了字体声明*/
p {margin:0; border:1px solid red;} /*外边距防止图片紧挨文本*/
img {float:left; margin:0 4px 4px 0;}
```

![](http://7xkpdt.com1.z0.glb.clouddn.com/61c5a10b9552bbcdaa6b8bb6b7f46f32.png)


#### 创建分栏
```css
p {float:left; margin:0; width:200px; border:1px solid red;}
img {float:left; margin:0 4px 4px 0;}
```

浮动非图片元素时，必须给它设定宽度，否则后果难以预料。

![](http://7xkpdt.com1.z0.glb.clouddn.com/ec918a9a6da0c0588a60b88b11c865b6.png)

#### 父元素会收缩
浮动元素脱离了文档流，其父元素也看不到它了，因而也不会包围它。父元素会收缩到没它一样。

#### 使父元素围住浮动元素的三种方法

##### 方法一:为父元素添加 overflow:hidden
第一个方法很简单，缺点是不太直观.

```css
section {border:1px solid blue; margin:0 0 10px 0; overflow:hidden;}
img {float:left;}
p {border:1px solid red;}
```

##### 方法二:同时浮动父元素

```css
section {border:1px solid blue; float:left; width:100%;}
img {float:left;}
footer {border:1px solid red; clear:left;}
```
另外，由 于 section 现在也浮动了，所以 footer 会努力往上挤到它旁边去。为了强制 footer 依然呆在 section 下方(否则会跑到浮动元素的旁边)，要给它应用 clear:left。

##### 方法三:添加非浮动的清除元素
第三种强制父元素包含其浮动子元素的方法，就是给 **父元素的最后添加一个非浮动的 子元素**，然后清除该子元素。

这种方法可以通过简单的给父元素（或者最后一个浮动元素）加上 `class="clearfix"` 做到。

```css
.clearfix:after {
    content:".";
    display:block;
    height:0;
    visibility:hidden;
    clear:both;
}
```

这三种方法的使用要因地制宜。比如，不能在下拉菜单的顶级元素上应用 overflow:hidden，否则作为其子元素的下拉菜单就不会显示了。因为下拉菜单会显 示在其父元素区域的外部，而这恰恰是 overflow:hidden 所要阻止的。再比如，不能 对已经靠自动外边距居中的父元素使用“浮动父元素”技术，否则它就不会再居中，而是根据浮动值浮动到左边或右边了。

(总之 clearfix 大法好。

### 定位 position
CSS 布局的核心是 position 属性，有 4 个值:static、relative、absolute、 fixed，默认值为 static。在静态定位的情况下，每个元素在处在常规文档流中。

#### relative
相对的是它原来在文档流中的位置(或者默认位置)
接下来，可以使用 top、right、 bottom 和 left 属性来改变它的位置了(往往只用top 和 left 就可以实现 我们想要的效果)

要注意，相对定位的元素自己相对于原始位置挪动了一下之外，这个元素原来占据的空间没有动，其他元素也不会动。

#### absolute
绝对定位跟静态定位和相对定位比，绝对不一样。因为绝对定位会把元素彻底从文 档流中拿出来。

绝对定位元素默认的定位上下文是 body 元素，通过 top 和 left 设定的偏移值。而实际上，绝对定位元素的任何祖先元素都可以成为它的定位上下文，只要你把相应祖先元素的 position 设定为非 static 即可。

#### fixed
从完全移出文档流的角度说，固定定位与绝对定位类似。

但不同之处在于，固定定位元素的定位上下文是视口，因此它不会随页面滚动而移动。

#### display:none vs visibility:hidden
把元素的 display 设定为 none， 该元素及所有包含在其中的元素，都不会在页面中显示。它们原先占据的所有空间也都会被“回收”。

把元素的 visibility 设定为 hidden，元素会隐藏，但它占据的页面空间仍然“虚位以待”。


## 字体和文本
### 字体族
```css
body {font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;}
```

在指定文本的字体时，需要多列出几种后备字体， 以防第一种字体无效。这个字体的列表也叫字体栈。

### 字体类
- serif，也就是衬线字体
- sans-serif，也就是无衬线字体
- monospace，也就是等宽字体
- cursive，也就是草书体或手写体
- fantasy，不能归入其他类别的字体(一般都是奇形怪状的字体)。

使用这些通用字体类的目的，就是确保在最坏的情况下，文档起码可以通过正确的字形来显示，将通用字体类写到最后即可。

### 字体样式
值:italic、oblique、normal。

示例:h2 {font-style:italic;} 。

### 文本属性
- 文本缩进: text-indent
- 字符间距: letter-spacing
- 单词间距: word-spacing<kbd></kbd>
- 文本对齐: text-align
- 行高: line-height，值:left、right、center、justify。
- 文本装饰: text-decoration，值:underline、overline、line-through、none。

## 页面布局
### 布局的基本概念
多栏布局有三种基本的实现方案:固定宽度、流动、弹性。

- 固定宽度布局的大小不会随用户调整浏览器窗口大小而变化。比如 grid （栅格）布局。
- 流动布局的大小会随用户调整浏览器窗口大小而变化。
- 弹性布局与流动布局类似，在浏览器窗口变宽时，不仅布局变宽，而且所有内容元素的大小也会变大。

#### 布局高度与布局宽度
> 两者的控制方法实在太不一样了

- 布局高度
    - 不必设定。
    - 假如你明确设定了 元素的高度，那么超出的内容要么被剪掉，要么会跑到容器之外——取决于元素 overflow 属性的设定。

- 布局宽度
    - 与高度不同，我们需要更精细地控制布局宽度
    - 以便随着浏览器窗口宽度的合理变化，布局能够作出适当的调整
    - 不要给包含在其中的内容元素设定宽度，内容元素应该由自身决定宽度

### 多栏固定宽度布局
```html
<div id="wrapper" class="clear-float">
    <article>article</article>
    <aside>aside</aside>
    <footer>footer</footer>
</div>
```

```css
* {
    box-sizing: border-box;
}
#wrapper {
    width:960px;
    margin:0 auto;
}
article {
    width:600px;
    float:left;
    border:1px solid;
    padding: 1px;
}
aside {
    width:360px;
    float:left;
    border:1px solid;
}
footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    border:1px solid;
}
.clear-float:after {
    content:".";
    display:block;
    height:0;
    visibility:hidden;
    clear:both;
}
```

#### 注意 box-sizing: border-box
当原布局各栏的宽度超过容器宽度时，右边的栏就会滑到左边的栏下方。

而在给各栏增加 `padding` 和 `border` 的时候，就会造成这种现象，于是我们使用了 `box-sizing: border-box;` 来避免这种情况，这时我们添加间隔的时候，只能使用 `padding` 不能使用 `margin`

### 三栏-中栏流动布局
实现中栏流动布局有两种方法。一种是在中栏改变大小时使用负外边距定位右栏, 另一种是使用 CSS3 让栏容器具有类似表格单元的行为。负外边距适合比较老的浏览 器,而 CSS 的 table 属性则要简单得多。

![](http://7xkpdt.com1.z0.glb.clouddn.com/31b5d43f453756b820debb339acb5acb.png)

#### 法一介绍
解决方案是控制两个外包装(通过 ID 值为 wrapper) 容器的外边距。其中一个外包装包围所有三栏,另一个外包装只包围左栏和中栏。

下面简单说明其原理。三栏中的右栏是 210 像素宽。为了给右栏腾出空间,中栏 article 元素有一个 210 像素的右外边距。当然, 光有这个外边距只能把右栏再向右推 210 像素。别急,包围左栏和中栏的两栏外包 装上 210 像素的负右外边距,会把右栏拉回 article 元素右外边距(在两栏外包装内 部右侧)创造的空间内。

中栏 aticle 元素的宽度是 auto,因此它仍然会力求占据浮动左栏剩余的所有空间，于是就是流动的了。

可是,一方面它自己的右外边距在两栏外包装内为右栏腾出了空间,另一方面两栏外包装的负右外边距又 把右栏拉到了该空间内。总之,这是个很巧妙的设计。

##### 人造栏技术
有人可能会纳闷,这些栏怎么都跟布局一样高呢。这里采用了一种叫“人造栏”的技术,这样才让所有栏看起来都一样高了。

这个技术说来也简单,就是给包围栏的 **外包装元素** 应用与各栏同宽的背景图片(与要模拟的懒等宽)和背景色。外包装元素跟它们包含的栏不一样,它们的高度就是布局高度。通过在它们的背景的垂直方向上重复拼接背景图片,就可以在视觉上造成各栏与布局同高的假象。

```css
.main_wrapper{
    background:url(images/bg_tile_150pxw.png) repeat-y #eee;
}
```

#### 法二:用CSS3 单元格实现
尽管利用 HTML 的<table>标签实现多栏布局是难以接受的,但使用 CSS 让布局形 如表格则是绝对可以接受的。

我们知道,CSS 可以把一个 HTML 元素的 display 属性设定为 table、table-row 和 table-cell。通过这种方法可以模拟相应 HTML 元素的行为。而通过 CSS 把布局中 的栏设定为 table-cell 有三个好处。

- 单元格(table-cell)不需要浮动就 **可以并排显示**,而且直接为它们应用内边距也不会破坏布局。
- 默认情况下,一行中的所有单元格高度相同,因而也不需要人造的等高栏效果了。
- 任何没有明确设定宽度的栏都是流动的

> CSS3 表格行为在 IE7 及更低版本中并没有得到支持

要实现一个三栏-流动中栏布局,只需要以下标记:

```html
<nav><!-- 内容 --></nav>
<article><!-- 内容 --></article>
<aside><!-- 内容 --></aside>
```

和以下 CSS:
```css
nav {
    display:table-cell;
    width:150px;
    background:#dcd9c0;
}
article {
    display:table-cell;
    background:#ffed53;
}
aside {
    display:table-cell;
    width:210px;
    background:#3f7ccf;
}
```

![](http://7xkpdt.com1.z0.glb.clouddn.com/14f08c94a41d3886994d522725b597c3.png)
