# react 中 key 的鲜有人知的妙用
大家肯定常用 key 在渲染列表的时候，一个是它可以提升渲染列表的效率，另一个是没有它 react 会报 warning，，，

但是实际上它还有一个很不错的用处

结论摆在最前面：

> 可以使用 key 来 remount 子组件

那这到底有什么用呢，且看我碰到的需求

## 需求

![](http://7xkpdt.com1.z0.glb.clouddn.com/601705d52553d8037f9a5bc6c61dfff6.png)

上图就是我开发的业务，一个 pc 网站上 基于 云旺的 chat，我这里碰到一个需求就是：

chat 的右侧边栏是一个发起 meeting 地方，触发时机是 点击  toolbar 的 meeting 的 icon 出现，消失时机是有三种情况：
1. 点击 send 按钮
2. 点击 toolbar 的 meeting icon
3. 点击切换聊天对象。

我碰到的问题是，当 meeting 消失，再次打开显示的时候，原来 填到 Meeting 组件的字段，应该全部清空。

but，我开发的时候并没有，查明原因发现是，我 Meeting 组件以及其子组件的 state 没有改变，所以 填到 Meeting 组件的字段 并没有清空。

一开始我的解决思路是拥有 state 的组件写 reset State 到 初始状态 的方法（就像常见的 destory 函数一样），然后由父组通过 ref 调用子组件方法，一会便发现发现好麻烦啊，而且触发消失的时机有多个。。


凝思苦想的时候，想到 react 有木有 reset state 的方法，于是 谷歌了几下，其中 这个链接 https://groups.google.com/forum/#!topic/reactjs/8JgClU9jol0 下写了

> "If you add a `key` attribute, then the component will remount"

我心想，当 key 改变了，组件 remount 的话，state 自然就 reset 了，那我要不试一试？考虑到我的 Meeting reset state 的时机是消失的时候，而我 Meeting 的父组件刚好有 isShow 这个 state，于是我加了一行代码

![](http://7xkpdt.com1.z0.glb.clouddn.com/48dda6058fdfe46ecae79682e1f03051.png)

然后果然成功了，任何消失时机下，这个需求都 ok 了。


后来发现我点击下图的 tab，同样也要将输入组件的 state reset 掉

![](http://7xkpdt.com1.z0.glb.clouddn.com/7fa15fdb1a1c458396739ee0c9cef3ca.png)

还是老办法，key 绑定当前选中的索引，如下图代码

![](http://7xkpdt.com1.z0.glb.clouddn.com/709ce9af48967dc3942aab304d56aea8.png)

一行代码解决本来要改几个文件、几十行的代码，当时心情非常好

## key test
那么 key 的改变后，react 里到底发生了什么呢，为了验证一下国际友人说的话，我在 Meeting 组件里 写了个 key test

首先我们回顾一下 react 生命周期

### react 生命周期
![](http://7xkpdt.com1.z0.glb.clouddn.com/751f4b5b37f5a7a02a406dd78b26fbb9.png)

### 验证代码

![](http://7xkpdt.com1.z0.glb.clouddn.com/2d3c1a2274fe9b5937946d9b41f2ad1f.png)


### 打印出来的 log 图

![](http://7xkpdt.com1.z0.glb.clouddn.com/11a5e26e73b0d59cfcdd20ad6a246c08.png)

在 change chated user 后（点击前面图 chat 的联系人，也就是改变聊天对象的时候），key 值发生了改变，react remount 了 Meeting 组件

## 缺点

优点显然易见，只用加一行代码，解决多个条件的触发问题，多个 state reset 问题。

缺点是，remount 代表 组件内部的整个 dom 重新渲染了一遍，在 移动端或 是列表组件等有 大量 dom 标签情景，是很有可能有性能问题的，非移动端、非大量 dom 标签的情况是没有性能问题的。
