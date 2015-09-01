from django.db import models
import os

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

        content = get_content(root, filename)
        new_article = Article()
        new_article.title = filename
        new_article.content = content
        new_article.tag = Tag.objects.filter(name=tag)[0]

        new_article.save()

    class Meta:
        ordering = ['-id']



def get_content(dirpath, filename):
    path = os.path.join(dirpath, filename)
    content = ""
    with open(path, 'r') as f:
        for line in f.readlines():
            content += line
    return content
