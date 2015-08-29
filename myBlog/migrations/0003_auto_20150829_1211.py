# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myBlog', '0002_tag_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='title',
            field=models.CharField(unique=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='tag',
            name='ParentTag',
            field=models.ForeignKey(blank=True, to='myBlog.Tag'),
        ),
        migrations.AlterField(
            model_name='tag',
            name='name',
            field=models.CharField(unique=True, max_length=100),
        ),
    ]
