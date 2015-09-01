#!/usr/bin/env python
# encoding: utf-8
from myBlog.models import *


def set_tag_article():

    root_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'Article')
    first_tags = []
    second_tags = []
    third_tags = []

    for root, dirs, files in os.walk(root_dir):

        # 第一级目录
        if root == root_dir:
            for tag in dirs:
                Tag.save_tag(tag, first_tags)

        parent_dir = root.split('/')[-1]

        # 第二级目录
        if parent_dir in [tag.name for tag in first_tags]:
            for tag in dirs:
                Tag.save_tag(tag, second_tags, parent_dir)

        # 第三级目录
        if parent_dir in [tag.name for tag in second_tags]:
            for tag in dirs:
                Tag.save_tag(tag, third_tags, parent_dir, is_column=True)
            for article in files:
                Article.save_article(root, str(article), parent_dir)

        # 第四级目录
        if parent_dir in [tag.name for tag in third_tags]:
            for article in files:
                Article.save_article(root, str(article), parent_dir)







