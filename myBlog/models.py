from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    parent_tag = models.ForeignKey('Tag', blank=True, null=True)

    def __str__(self):
        return self.name

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


class Article(models.Model):
    title = models.CharField(max_length=100, unique=True)
    content = models.TextField()
    pub_date = models.DateField(auto_now_add=True)
    change_date = models.DateTimeField(auto_now=True)
    tag = models.ForeignKey('Tag')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-id']
