# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-02-17 06:49
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_auto_20170216_1543'),
    ]

    operations = [
        migrations.AddField(
            model_name='userextend',
            name='latest_pub_date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2017, 2, 17, 6, 49, 9, 462925, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
