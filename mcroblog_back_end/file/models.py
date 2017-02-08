from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from blog.models import Blog
from users.models import UserExtend


class BlogImage(models.Model):
    user= models.ForeignKey(User)
    path = models.ImageField(upload_to = 'blog_img/',)
    pub_date = models.DateTimeField(auto_now_add=True)
