from django.contrib.auth.models import User

from models import Blog
from rest_framework import serializers

class BlogSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    user_id = serializers.ReadOnlyField(source='user.id')
    head_image = serializers.ReadOnlyField(source='user.userextend.head_image.name')
    class Meta:
        model = Blog
        fields = ('url', 'id', 'title', 'content', 'tags', 'pub_date', 'user', 'user_id', 'head_image','note')


