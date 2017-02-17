from copy import copy

from django import http
from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response

from blog.models import Blog
from blog.serializers import BlogSerializer
from social.models import Follow, Like
from social.serializers import FollowSerializer, LikeSerializer
from users.models import UserExtend
from users.serializers import UserSerializer, UserExtendSerializer

# Create your views here.



class FollowViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Follow.objects.all().order_by('-create_date')
    serializer_class = FollowSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save()

    def create(self, request, *args, **kwargs):
        user_serializer = UserSerializer(request.user, context={'request': request}).data
        if user_serializer['id'] is not request.data['follower']:
            user_extend_serializer = UserExtendSerializer(UserExtend.objects.get(pk=request.data['follower']),
                                                          context={'request': request}).data
            data = copy(request.data)
            data['blogger'] = user_serializer['url']
            data['follower'] = user_extend_serializer['url']
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return http.HttpResponseNotFound()

    def destroy(self, request, *args, **kwargs):
        id = request.resolver_match.kwargs['pk']
        instance = Follow.objects.filter(blogger = request.user, follower = id)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset().filter(blogger = request.user))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class LikeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Like.objects.all().order_by('-create_date')
    serializer_class = LikeSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        user_serializer = UserSerializer(request.user, context={'request': request}).data
        blog_serializer = BlogSerializer(Blog.objects.get(pk=request.data['blog']),
                                                      context={'request': request}).data
        data = copy(request.data)
        data['user'] = user_serializer['url']
        data['blog'] = blog_serializer['url']
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):
        id = request.resolver_match.kwargs['pk']
        instance = Like.objects.filter(user = request.user, blog = id)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
