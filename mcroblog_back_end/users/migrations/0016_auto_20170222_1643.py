# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-02-22 16:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_auto_20170217_0834'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userextend',
            name='latest_pub_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
