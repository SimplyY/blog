from django.db import models
import os
from datetime import datetime


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    parent_tag = models.ForeignKey('Tag', blank=True, null=True)
    is_column = models.BooleanField()

    def __str__(self):
        return self.name + " parent:" + str(self.parent_tag)

    def is_child_tag(self, tag_name):
        current_tag = self
        while current_tag.parent_tag:
            if current_tag.parent_tag.name == tag_name:
                return True
            current_tag = current_tag.parent_tag
            if not current_tag:
                return False
        return False

    def get_tags(self):
        tags = [self, ]
        current_tag = self
        while current_tag.parent_tag:
            current_tag = current_tag.parent_tag
            if not current_tag:
                return tags
            tags.insert(0, current_tag)

        return tags

    @staticmethod
    def save_tag(tag_name, tags, parent_tag=None, is_column=False):
        new_tag = Tag()
        new_tag.name = tag_name
        new_tag.parent_tag = Tag.objects.filter(name=parent_tag)[0] if parent_tag else None

        new_tag.is_column = is_column

        tags.append(new_tag)
        new_tag.save()


class Article(models.Model):
    title = models.CharField(max_length=100, unique=True)
    tag = models.ForeignKey('Tag')
    content = models.TextField()
    pub_date = models.DateField(auto_now_add=True)
    change_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title + " tag:" + str(self.tag)

    @staticmethod
    def save_article(root, filename, tag):
        if filename == '.DS_Store':
            return

        pub_date, change_date, content = get_article_info(root, filename)
        new_article = Article()
        new_article.title = filename
        new_article.pub_date = pub_date
        new_article.change_date = change_date
        new_article.content = content
        new_article.tag = Tag.objects.filter(name=tag)[0]

        new_article.save()

    class Meta:
        ordering = ['-id']


PUB_TIME = '发布时间：'
UPD_TIME = '更新时间：'

# pub_date, change_date, content
def get_article_info(dirpath, filename):
    path = os.path.join(dirpath, filename)
    content = ""
    file_content = ""
    with open(path, 'r') as f:
        for index, line in enumerate(f.readlines()):
            if index == 0:
                pub_date = get_pub_date(line)
                file_content += PUB_TIME + pub_date
            elif index == 1:
                change_date = get_change_date(line)
                file_content += UPD_TIME + change_date
            else:
                content += line
                file_content += content

    with open(path, 'w') as f:
        f.write(file_content)

    return pub_date, change_date, content

def get_pub_date(line):
    if line:
        pub_date = line
    else:
        pub_date = str(datetime.today()).split(' ')[0]

    return pub_date

def get_change_date(line):
    change_date = str(datetime.today()).split('.')[0]
    return change_date
