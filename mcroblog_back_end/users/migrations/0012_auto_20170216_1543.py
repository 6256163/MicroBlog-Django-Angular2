# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-02-16 15:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_auto_20170216_1111'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userextend',
            name='follow_count',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='userextend',
            name='like_count',
            field=models.PositiveIntegerField(default=0),
        ),
    ]