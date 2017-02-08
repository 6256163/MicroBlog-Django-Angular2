# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-01-17 12:06
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('file', '0002_auto_20170117_1053'),
    ]

    operations = [
        migrations.AlterField(
            model_name='headimage',
            name='path',
            field=models.ImageField(default='head_img/default.png', upload_to='head_img/'),
        ),
        migrations.AlterField(
            model_name='headimage',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='users.UserExtend'),
        ),
    ]
