from __future__ import unicode_literals
from django.contrib.auth.models import User
from rest_framework import serializers

from social.models import Like, Follow


class FollowSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.ReadOnlyField(source='follower.user.username')
    latest_pub_date = serializers.ReadOnlyField(source='follower.latest_pub_date')
    head_image = serializers.ReadOnlyField(source='follower.head_image.name')
    id = serializers.ReadOnlyField(source='follower.id')
    follow_id = serializers.ReadOnlyField(source='id')

    class Meta:
        model = Follow
        fields = ('url', 'id', 'blogger', 'follower', 'username','latest_pub_date', 'follow_id','head_image',)


class LikeSerializer(serializers.HyperlinkedModelSerializer):
    user_id = serializers.ReadOnlyField(source='user.id')
    blog_id = serializers.ReadOnlyField(source='blog.id')
    class Meta:
        model = Like
        fields = ('url', 'id', 'user', 'blog', 'user_id', 'blog_id')