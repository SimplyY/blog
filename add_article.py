#!/usr/bin/env python
# encoding: utf-8

from datetime import datetime
import os

# 运行程序会自动将两时间以当前时间添加，删除相应行，再更改即可以当前时间更新之，也可以手动更新，但是行头不能变

# 第一行
PUB_TIME = '发布时间：'
# 第二行，
UPD_TIME = '更新时间：'
# 第三行，需要自己填写自己的仓库地址
GITHUB_URL = 'https://github.com/SimplyY/Blog/tree/master/Article'

root_dir = os.path.join(os.path.dirname(__file__), 'Article')


def get_pub_date_info(line):
    pub_date_info = PUB_TIME + str(datetime.today()).split(' ')[0] + '\n'
    return pub_date_info

def get_change_date_info(line):
    change_date_info = UPD_TIME + str(datetime.today()).split('.')[0] + '\n'
    return change_date_info

def deal_article(dir, article):
    if article == '.DS_Store':
        return

    path = os.path.join(dir, article)
    file_content = ""
    pub_date_info = ""
    change_date_info = ""
    url = ""

    with open(path, "r") as f:
        for index, line in enumerate(f.readlines()):
            if index == 0:
                if line[0:4] != '发布时间':
                    pub_date_info = get_pub_date_info(line)
                else:
                    pub_date_info = line
                    continue
            elif index == 1:
                if line[0:4] != '更新时间':
                    change_date_info = get_change_date_info(line)
                else:
                    change_date_info = line
                    continue
            elif index == 2:
                url ="github 地址: " + GITHUB_URL + '\n'
                if line[0:9] == 'github 地址':
                    continue

            file_content += line

    file_content = pub_date_info + change_date_info + url + file_content

    with open(path, "w") as f:
        f.write(file_content)

    print("articles added")

def walk_article():
    first_tags = []
    second_tags = []
    third_tags = []

    for root, dirs, files in os.walk(root_dir):
        if root == root_dir:
            for tag in dirs:
                first_tags.append(tag)

        parent_dir = root.split('/')[-1]

        # 第二级目录
        if parent_dir in first_tags:
            for tag in dirs:
                second_tags.append(tag)

        # 第三级目录
        if parent_dir in second_tags:
            for tag in dirs:
                third_tags.append(tag)
            for article in files:
                deal_article(root, article)

        # 第四级目录
        if parent_dir in third_tags:
            for article in files:
                deal_article(root, article)


if __name__ == '__main__':
    walk_article()
