from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from users.models import UserExtend


class Blog(models.Model):
    user = models.ForeignKey(User)
    title = models.TextField(null=True, blank=True, )
    content = models.TextField(null=False, blank=False, )
    tags = models.TextField(null=True, blank=True, )
    pub_date = models.DateTimeField(auto_now_add=True)
    note = models.IntegerField(default=0)

    class Meta:
        ordering = ('pub_date',)

    def __str__(self):
        return self.title


@receiver(post_save, sender=Blog)
def update_follow_count(sender, created, instance, **kwargs):
    if created:
        userextend = UserExtend.objects.get(pk=instance.user.id)
        userextend.latest_pub_date = instance.pub_date
        userextend.save()


class Tag(models.Model):
    name = models.CharField(max_length=26)
    blog = models.ManyToManyField(Blog)

    def __str__(self):
        return self.name
