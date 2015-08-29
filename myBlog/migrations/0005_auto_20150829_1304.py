# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myBlog', '0004_auto_20150829_1214'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tag',
            old_name='ParentTag',
            new_name='parent_tag',
        ),
    ]
