# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myBlog', '0003_auto_20150829_1211'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='ParentTag',
            field=models.ForeignKey(null=True, to='myBlog.Tag', blank=True),
        ),
    ]
