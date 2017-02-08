from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Blog(models.Model):
    user = models.ForeignKey(User)
    title = models.TextField(null=True, blank=True,)
    content = models.TextField(null=False, blank=False,)
    tags = models.TextField(null=True, blank=True,)
    pub_date = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ('pub_date',)

    def __str__(self):
        return self.title


class Tag(models.Model):
    name = models.CharField(max_length=26)
    blog = models.ManyToManyField(Blog)

    def __str__(self):
        return self.name




