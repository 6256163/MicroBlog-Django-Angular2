from rest_framework import serializers

from models import Blog


class BlogSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    user_id = serializers.ReadOnlyField(source='user.id')
    head_image = serializers.ReadOnlyField(source='user.userextend.head_image.name')
    class Meta:
        model = Blog
        fields = ('url', 'id', 'title', 'content', 'tags', 'pub_date', 'user', 'user_id', 'head_image','note')


