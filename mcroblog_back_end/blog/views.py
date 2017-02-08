# coding=utf-8
from copy import copy
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework import permissions
from models import Blog
from serializers import BlogSerializer


# Create your views here.


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('pub_date')
    serializer_class = BlogSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        data = copy(request.data)
        data['content'] = map(lambda x: x.encode('utf-8').encode('base64', 'strict'), data['content'])
        data['content'] = '@'.join(data['content'])
        data['title'] = data['title'].encode('utf-8').encode('base64', 'strict')
        data['tags'] = data['title'].encode('utf-8').encode('base64', 'strict')
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset().filter(user=request.user)).order_by("-pub_date")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @detail_route(methods=['get'])
    def recent_blogs(self, request, user):
        queryset = self.filter_queryset(self.get_queryset().filter(user=user)).order_by("-pub_date")
