from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models
# Create your models here.


class UserExtend(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    head_image = models.ImageField(upload_to='head_img/', default='head_img/default.png')
    background_image = models.ImageField(upload_to='background/', default='background/default_background.png', )
    background_color = models.CharField(max_length=100)
    u_title = models.CharField(max_length=20, default='Untitled')
    profile = models.CharField(max_length=225, blank=True)
    like_count = models.IntegerField(default=0)
    follow_count = models.IntegerField(default=0)
    latest_pub_date = models.DateTimeField(blank=True)


