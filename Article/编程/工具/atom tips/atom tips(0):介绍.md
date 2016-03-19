# atom tips(0):介绍

> github 官方介绍：The hackable text editor

atom 的用户越来越多，尤其是 web 前端开发者，几乎能和 sublime 分庭抗礼，而且要知道的是 sublime 是 **个人开发者并且收费闭源**(蛇神说更新慢的一比，bug万年不修)，而 atom 则是整个社区驱动，插件一年发布上千个(一堆 amazing 的插件)，而且在 web 前端开发方面现在几乎拥有 sublime 的所有功能（并且更多，关键是还可以 hackable 啊）。

总之，我觉得它非常的简单易用、外形好看、功能强大、hackable、amazing、强大的社区驱动（github 就是它的生态 orz），前端开发者的福音。

## 外形
atom 的界面 ui 非常的现代化，并且有很多 theme 可以选择

我的 theme

![](http://7xkpdt.com1.z0.glb.clouddn.com/2a94d212f39b7876bbd70e476ad7fa41.png)

![](http://7xkpdt.com1.z0.glb.clouddn.com/71a984ca14813bb7f774d90aa33a2a15.png)

## 性能
我知道大家都黑它启动慢，但是讲真，它越来越快了，我这里第三方插件装了56个，只要 1.5s 启动。

> 同时 Atom编辑器1.0版本以来性能得到了很大的提升，主要是两个方面，一方面是js层的各种渲染优化，控件优化，延迟绘制，延迟加载，只绘制当前需要的东西等，另外一方面是将一些核心数据结构移动到 Electron 的 C++层，如今1.54版本性能较去年版本已经有了本质区别，运行时加载是慢些（但也比eclipse快很多），实际使用并没觉得不如别的编辑器，况且，js层的优化和C层的优化未来还有很大的空间可以进步。
作者：韦易笑
链接：https://www.zhihu.com/question/22867204/answer/90728790
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 安装插件
有着 ui 界面的插件页面，安装、管理插件会非常方便

![](http://7xkpdt.com1.z0.glb.clouddn.com/d59372a57e485c3411ead78ea07ca4a8.png)

## 丰富的快捷键操作
> cmd 在 win 下对应为 ctrl

它是基于 electron(Electron 的底层基于Chromium 和node.js)，并且你会发现它非常像 chrome dev tools(cmd + p，cmd + shift + f 等等快捷键完全一样，一套快捷键俩地方使用，简直不能再棒)。

更多在这 SimplyY 的博客文章: 《atom tips(1):常用操作》	链接为： http://simplyy.space/article/56ecd89a39a1954f69680f1e

## 强大的模糊命令
cmd + shift + p 启动，通过命令输入框可以使用任何插件（自带插件和第三方插件）的功能。特别是对于懒得记太多快捷键的童鞋的福音（说的就是我。。）

![](http://7xkpdt.com1.z0.glb.clouddn.com/b54150e9c5a51bc5c984ccb1afd9631b.png)

## 丰富而且 amazing 的插件

SimplyY 的博客文章: 《atom tips(2):web 开发常用插件》	链接为： http://simplyy.space/article/56ecd89a39a1954f69680f1f

## 强大的 snippets 系统
自己定制自己的代码补全功能，是那么的简单。动态语言补全的福音。而且非常的 hackable。

我自己写了一个 web 开发者常用的， https://github.com/SimplyY/simplyy-snippets

详情见这里 https://segmentfault.com/a/1190000003042239

## 和 git、github 深度配合
你可以直接从当前文件定位到 github 的文件，和 git 的深度配合

详情见这里 https://segmentfault.com/a/1190000003043309
