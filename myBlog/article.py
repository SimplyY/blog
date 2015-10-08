#!/usr/bin/env python
# encoding: utf-8
from myBlog.models import *


def set_tag_article():

    # Tag.objects.all().delete()
    # Article.objects.all().delete()
    root_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'Article')

    first_tags = []
    second_tags = []
    third_tags = []

    new_tags = []
    new_articles = []

    for root, dirs, files in os.walk(root_dir):

        # 第一级目录
        if root == root_dir:
            for tag in dirs:
                first_tags.append(tag)
                new_tags.append(tag)
                try:
                    Tag.objects.get(name=tag)
                except Tag.DoesNotExist:
                    Tag.save_tag(tag)

        parent_dir = root.split('/')[-1]

        # 第二级目录
        if parent_dir in first_tags:
            for tag in dirs:
                second_tags.append(tag)
                new_tags.append(tag)
                try:
                    Tag.objects.get(name=tag)
                except Tag.DoesNotExist:
                    Tag.save_tag(tag, parent_dir)

        # 第三级目录
        if parent_dir in second_tags:
            for tag in dirs:
                third_tags.append(tag)
                new_tags.append(tag)
                try:
                    Tag.objects.get(name=tag)
                except Tag.DoesNotExist:
                    Tag.save_tag(tag, parent_dir, is_column=True)
            for article in files:
                if article == '.DS_Store':
                    continue
                new_articles.append(article)
                try:
                    old_article = Article.objects.get(title=article)
                    Article.update_article(old_article, root, str(article), parent_dir)
                except Article.DoesNotExist:
                    Article.save_article(root, str(article), parent_dir)

        # 第四级目录
        if parent_dir in third_tags:
            for article in files:
                if article == '.DS_Store':
                    continue
                new_articles.append(article)
                try:
                    old_article = Article.objects.get(title=article)
                    Article.update_article(old_article, root, str(article), parent_dir)
                except Article.DoesNotExist:
                    Article.save_article(root, str(article), parent_dir)

        # 删除数据库里面的多余目录和文章
    old_tags = [tag.name for tag in Tag.objects.all()]
    old_articles = [article.title for article in Article.objects.all()]

    useless_tags = list(set(old_tags) - set(new_tags))
    useless_articles = list(set(old_articles) - set(new_articles))

    for tag in useless_tags:
        Tag.objects.get(name=tag).delete()
    for article in useless_articles:
        Article.objects.get(title=article).delete()
