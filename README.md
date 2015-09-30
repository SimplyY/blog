# 博客
这里准备搭建我的个人博客

## 图片展示
![](https://cloud.githubusercontent.com/assets/8455579/9835395/89daff1c-5a1b-11e5-89ab-162d2445f952.png)

![](https://cloud.githubusercontent.com/assets/8455579/9835391/740e3262-5a1b-11e5-83c9-d3d657cab562.gif)

![](http://7xkpdt.com1.z0.glb.clouddn.com/15-8-4/25566477.jpg?attname=&e=1442212641&token=B7AYfxUfqmERZ1et2qdFSOajI17arpp4gDUn1NdV:X81WNhZpZZ8R-_jjOxelUIu3nGM)

## 文章数据流
1. 文章数据从文件夹里
2. 到数据库里
3. 到前端页面

## 写文章的步骤
1. 写文章
2. 运行脚本来在文章中添加日期数据 eg：python3 add_article.py
3. 更新数据库里的文章 访问 http://site/blog/renew_article

### 有关文章的映射关系
0. 阅读 model 内容的表结构
1. 项目根目录的 Article 文件夹里的所有文件夹都是 tag，文件夹名位 tag name
2. 所有文章都是 article 上层文件夹就是他的 tag， 其中 title 是文件名， pubdate 和 changedate 分布为文件内容的第一行和第二行，文件正文 content 从第三行开始。

## TODO
- [ ] 将静态图片放到好的 CDN 里
- [ ] 将项目在服务器里运行，上线
- [ ] 支持 rss
- [ ] 自动化更新文章的流程：git push 触发 `python3 add_article.py` 并且 py 文件访问renew_article页面来


## 设计关键
- 导航栏标签、专辑标签
- 银色为主色调
