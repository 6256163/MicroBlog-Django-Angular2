from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from blog.models import Blog
from users.models import UserExtend


class Follow(models.Model):
    blogger = models.ForeignKey(User)
    follower = models.ForeignKey(UserExtend)
    create_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (("blogger", "follower"),)



class Like(models.Model):
    user = models.ForeignKey(User)
    blog = models.ForeignKey(Blog)
    create_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (("user", "blog"),)


@receiver(post_save, sender=Follow)
def update_follow_count(sender, created, instance, **kwargs):
    if created:
        userextend = UserExtend.objects.get(pk=instance.blogger.id)
        userextend.follow_count += 1
        userextend.save()


@receiver(post_delete, sender=Follow)
def decrease_follow_count(sender, instance, **kwargs):
    userextend = UserExtend.objects.get(pk=instance.blogger.id)
    userextend.follow_count = userextend.follow_count - 1 <0 if 0 else  userextend.follow_count - 1
    userextend.save()


@receiver(post_save, sender=Like)
def increase_like_count(sender, created, instance, **kwargs):
    if created:
        userextend = UserExtend.objects.get(pk=instance.user.id)
        userextend.like_count += 1
        userextend.save()
        instance.blog.note += 1
        instance.blog.save()


@receiver(post_delete, sender=Like)
def decrease_like_count(sender, instance, **kwargs):
    userextend = UserExtend.objects.get(pk=instance.user.id)
    userextend.like_count = userextend.like_count - 1 <0 if 0 else  userextend.like_count - 1
    userextend.save()
    instance.blog.note = instance.blog.note - 1 <0 if 0 else  instance.blog.note
    instance.blog.save()