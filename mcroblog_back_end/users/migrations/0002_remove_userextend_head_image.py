# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-01-17 16:00
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userextend',
            name='head_image',
        ),
    ]
