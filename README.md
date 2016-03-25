## TODO
- title change in router contanier
- 延迟加载 img
- css render in server

# 博客
博客地址： [http://simplyy.space/](http://simplyy.space/)

## 效果图
![效果图](http://7xkpdt.com1.z0.glb.clouddn.com/53b61f68635c52ede78449394e995b82.png)

## 介绍
博客已经搭成，里面写了一篇简版介绍（包括内容和技术），地址： http://simplyy.space/article/56cb46564496cee272dea173

这里的是详细的技术介绍，包括搭建流程，重写的进度，前后端各种技术细节（有的可能没写上去，有疑惑的开 issue）。

- 后端：express + mongodb + node-restful,  也就是使用 node 遍历文件目录作为文章和标签的数据源，提供 rest api
- 使用 react 服务器渲染方案，好多坑 orz。
- 前端：react + react router + redux + babel + webpack + sass 开发的 spa 博客应用，并尝试使用 immutable.js

## 计划
### 后端
> node express mongodb fs restful


- [x] 扫描文件目录生成标签和文章
- [x] 提供 restful api，文档看 node/app/model.js 里的相应 schema。
- [ ] 支持 www
- [ ] 邮件提醒功能（一天发一封）
- [ ] https
- [x] 服务器端渲染

！！！禁止有相同的目录名或者文件名！！！（因为这俩会作为主键存在数据库中）

扫描文件目录树生成文章（md 文件）、标签（文件夹），前端交互生成评论。

文章 model， 标签 model，详情见 node/app/model.js 里的相应 schema。

### pc 前端
js: react redux echart

用 react router + 组件化开发 来spa

- [x] spa
- [x] redux
- [x] 组件开发
- [x] 正文锚点功能
- [ ] 回到顶部
- [x] ContentTable (左侧点击，显示目录，根据 h 标签开发）
- [ ] 评论功能 CommentBox avatar url default 'http://7xkpdt.com1.z0.glb.clouddn.com/46867d9be26db9982249775578cf37fc.png'
- [ ] chartjs


#### 手机端
准备使用 vue vuex vue-loader vue-router

## 设计关键
- 导航栏标签、专辑标签
- 银色为主色调


## 搭建流程
> 所有命令应该在项目根目录使用

如果想 fork 过去学习或者使用的话，就需要搭建，**搭建需要*nix 平台、mongodb、nodejs 这三环境**

### 配置环境和文件
> 第一次 clone 下来的步骤，注意不建议直接拿去使用，除非对node后端开发 linux 操作很熟，或者有人帮助

0. 设置 config 文件，一定要设置好，和程序运行有关："./config.js"文件，mongodb 配置文件 "./node/mongod.conf"
1. npm install 所有的依赖
2. npm run config 运行配置脚本程序  

### 运行服务器
> 重新开机后都要运行

1. npm run mongodb 启动数据库（端口默认为27017,修改见 "./node/mongod.conf"文件）
2. npm run server 启动服务器(默认同上，修改方式同上)

``
