from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models
# Create your models here.
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from blog.models import Blog


class UserExtend(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    head_image = models.ImageField(upload_to='head_img/', default='head_img/default.png')
    background_image = models.ImageField(upload_to='background/', default='background/default_background.png', )
    background_color = models.CharField(max_length=100)
    u_title = models.CharField(max_length=20, default='Untitled')
    profile = models.CharField(max_length=225, blank=True)
    like_count = models.PositiveIntegerField(default=0)
    follow_count = models.PositiveIntegerField(default=0)


class Follow(models.Model):
    blogger = models.ForeignKey(User)
    follower = models.ForeignKey(UserExtend)
    create_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (("blogger", "follower"),)


@receiver(post_save, sender=Follow)
def update_follow_count(sender, created, instance, **kwargs):
    if created:
        instance.userextend = UserExtend.objects.get(pk=instance.user.id)
        instance.userextend.follow_count += 1
        instance.userextend.save()


class Like(models.Model):
    user = models.ForeignKey(User)
    blog = models.ForeignKey(Blog)
    create_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (("user", "blog"),)


@receiver(post_save, sender=Like)
def increase_like_count(sender, created, instance, **kwargs):
    if created:
        instance.userextend = UserExtend.objects.get(pk=instance.user.id)
        instance.userextend.like_count += 1
        instance.userextend.save()
        instance.blog.note +=1
        instance.blog.save()


@receiver(post_delete, sender=Like)
def decrease_like_count(sender, instance, **kwargs):
    instance.userextend = UserExtend.objects.get(pk=instance.user.id)
    instance.userextend.like_count -= 1
    instance.userextend.save()
    instance.blog.note -= 1
    instance.blog.save()
