import random
from copy import copy

import re
import json
from django import http
from django.contrib import auth
from django.contrib.auth.models import User
from django.core import serializers
from django.db.models import Q
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import permissions
from rest_framework import status
from rest_framework import views
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from blog.models import Blog
from blog.serializers import BlogSerializer
from users.models import UserExtend, Follow
from users.serializers import UserSerializer, UserExtendSerializer, FollowSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        content = {
            'user': unicode(request.user),  # `django.contrib.auth.User` instance.
            'auth': unicode(request.auth),  # None
        }
        return Response(content)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return http.JsonResponse(serializer.data)


class UserExtendViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = UserExtend.objects.all()
    serializer_class = UserExtendSerializer

    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        follow = Follow.objects.filter(blogger=request.user)
        followers = []
        for f in follow:
            followers.append(f.follower.user)
        queryset = self.filter_queryset(self.get_queryset().filter(~Q(user=request.user) & ~Q(user__in=followers)))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        # get user
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        # get recent blogs
        queryset_blogs = Blog.objects.filter(user=instance.user).order_by('-pub_date')[:3]
        serializer_blogs = BlogSerializer(queryset_blogs, context={'request': request}, many=True)
        return Response({'user': serializer.data, 'blogs': serializer_blogs.data})


class FollowViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Follow.objects.all().order_by('create_date')
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


class LoginView(views.APIView):
    def post(self, request, format=None):
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                auth.login(request, user)
                return http.JsonResponse(UserSerializer(user, context={'request': request}).data)
            else:
                return http.HttpResponseBadRequest("User is deactivate")

        else:
            return http.HttpResponseBadRequest("Username or password is wrong")


def logout(request):
    auth.logout(request)
    return http.HttpResponse(status=status.HTTP_200_OK)

@ensure_csrf_cookie #set the csrf always
def isLogin(request):
    if request.user.is_authenticated():
        return http.JsonResponse({'user': UserSerializer(request.user, context={'request': request}).data,
                                  'user_extend': UserExtendSerializer(request.user.userextend,
                                                                      context={'request': request}).data})
    else:
        return http.HttpResponse(status=status.HTTP_401_UNAUTHORIZED)



@permission_classes((AllowAny,))
def register(request):
    if request.method == 'POST':
        data = request.POST
        if not request.POST:
            data = json.loads(request.body)

        existUser = User.objects.filter(username=data.get('username')) or User.objects.filter(email=data.get('email'))
        if (not existUser):
            re_name = r'^(?!_)[a-zA-Z0-9_\u4e00-\u9fa5]{4,24}$'
            re_pwd = r'^[a-zA-Z0-9!@#$%^&*_]{4,24}$'
            re_email = r"^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$"
            if (re.match(re_name, data.get('username')) and
                    re.match(re_pwd, data.get('password')) and
                    re.match(re_email, data.get('email'))
                ):
                user = User.objects.create_user(**data)
                bg = random.sample(['white', 'pink', '#90abff', 'yellow'], 1)[0]
                user_extend = UserExtend.objects.create(user=user, background_color=bg)
                return http.HttpResponse(status=status.HTTP_201_CREATED)
            else:
                return http.HttpResponseBadRequest("The format of username, password of email is incorrect.")
        else:
            return http.HttpResponseBadRequest("Username or email is existing")
