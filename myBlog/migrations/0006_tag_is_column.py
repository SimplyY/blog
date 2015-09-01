# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('myBlog', '0005_auto_20150829_1304'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='is_column',
            field=models.BooleanField(default=datetime.datetime(2015, 9, 1, 10, 44, 7, 890565, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
