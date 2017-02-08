# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-01-18 03:21
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('file', '0003_auto_20170117_1206'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogimage',
            name='pub_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='headimage',
            name='pub_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]