# 博客
这里准备搭建我的个人博客

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

## 重写计划
### 后端
> node express mongodb fs restful


- [x] 扫描文件目录生成标签和文章
- [x] 提供 restful api，文档看 node/app/model.js 里的相应 schema。
- [ ] 支持 www
- [ ] 邮件提醒功能

！！！禁止有相同的目录名或者文件名！！！（因为这俩会作为主键存在数据库中）

扫描文件目录树生成文章（md 文件）、标签（文件夹），前端交互生成评论。

文章 model， 标签 model，详情见 node/app/model.js 里的相应 schema。

### pc 前端
css:  [alice](http://aliceui.org/)
js: react redux chartjs

用 react router + 组件化开发 来spa

- [x] spa
- [x] redux
- [ ] 组件开发(已完成50%)

- [ ] js 设置 meta title and <meta name="description" content="text">
- [ ] ArticlesTable (左侧点击，显示目录，点击加号展开一级标题，根据 h 标签开发）
- [ ] 正文锚点功能

#### 组件结构
- root
    - app(common part)
        - NavigationBar 编程 生活 诗集 电影 最热）
        - InfoSideBar(right)
            - ColumnTag(三级标签)
            - personalInfo(zhihu weibo email)
            - github info (https://github.com/lepture/github-cards)
            - subscribe by github api
    - spa main
        - ArticleListBox
            - CurrentTagChain
            - ArticlesTable (左侧点击，显示目录）
            - ArticleList（显示喜欢数、分享数、（投票结果的平均）难易度、日期）
                - click more
        - ArticleBox
            - CurrentTagChain
            - ArticleIntro
            - Article
                - ArticleInfo（时间，难易度：简单、中等、难....）
                - ArticleMd(md 渲染, 正文锚点功能)
            - VoteBox(投票功能，适合人群：新手、1年、2年....)
            - shareLoveBox（分享、喜欢按钮)
                - share
                - love
            - CommentBox(antd 表单)
        - Chart 用 chartjs 写博客文章标签分析图表
        - InvalidUrlBox

### mobile 前端
- FrameWork：redux
- View：react
- Router：react-router
- Ajax：superagent

## 设计关键
- 导航栏标签、专辑标签
- 银色为主色调
