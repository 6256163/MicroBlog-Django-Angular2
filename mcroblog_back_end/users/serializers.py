from __future__ import unicode_literals
from django.contrib.auth.models import User
from rest_framework import serializers

from users.models import UserExtend, Follow


class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('url', 'id','username', 'email', 'groups',)


class UserExtendSerializer(serializers.HyperlinkedModelSerializer):
    head_image = serializers.ReadOnlyField(source='user.userextend.head_image.name')
    background_image = serializers.ReadOnlyField(source='user.userextend.background_image.name')
    username = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = UserExtend
        fields = ('url', 'id', 'head_image', 'background_image', 'background_color', 'u_title', 'profile', 'username')



class FollowSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Follow
        fields = ('url', 'id', 'blogger', 'follower')