# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-01-18 14:45
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0005_auto_20170118_0547'),
    ]

    operations = [
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('blogger', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blogger', to=settings.AUTH_USER_MODEL)),
                ('follower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='follower', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='userextend',
            name='background_image',
            field=models.ImageField(default='background/default_background.png', upload_to='background/'),
        ),
        migrations.AlterUniqueTogether(
            name='follow',
            unique_together=set([('blogger', 'follower')]),
        ),
    ]
