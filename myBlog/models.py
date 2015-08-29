from django.db import models

# Create your models here.

class Tag(models.Model):
    ParentTag = models.ForeignKey('Tag')


class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    pub_date = models.DateField(auto_now_add=True)
    change_date = models.DateTimeField(auto_now=True)
    tag = models.ForeignKey('Tag')

    class Meta:
        ordering = ['-id']


