# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myBlog', '0006_tag_is_column'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='change_date',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='article',
            name='pub_date',
            field=models.CharField(max_length=100),
        ),
    ]
