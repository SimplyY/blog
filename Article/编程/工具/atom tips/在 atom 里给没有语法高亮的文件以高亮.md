# 在 atom 里给没有语法高亮的文件以高亮
## 前言
当你使用 atom 打开一些没有语法高亮的文件，最常见的就是模板文件了，因为后缀的原因，atom 无法识别（atom 本身不支持这种语法，并且也没有 package 支持这种语法）。

我们可以通过手动更换类似 grammer 来重新开启语法高亮，但这每次这样操作实在太麻烦。

这里有一劳永逸的、自动化的方法。


## 以开 .art 模板文件 为例
这里以 .art 模板文件为例，使 atom 每次自动以 html(handlebars)的语法 高亮这种后缀名的文件。


### 步骤
1. apm install atom-handlebars(或者 ui 界面安装)
2. apm install file-types(或者 ui 界面安装)
3. 打开 atom 的 config 文件（点击 setting 里面的 open config folder 按钮）
4. 在 config.cson 里，加入如下代码(第一行应该是有的，你只需要加入2、3行)
![](http://7xkpdt.com1.z0.glb.clouddn.com/37ef3528958270a84f3a8bf691b0f872.png)
5. 重启 atom，.art 文件会自动以  html(handlebars)的语法 高亮语法，over！
 
