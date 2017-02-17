"""mcroblog_back_end URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from blog.views import BlogViewSet
from social.views import FollowViewSet
from social.views import LikeViewSet
from users.views import UserViewSet, LoginView, UserExtendViewSet
from users import views
from file import views as f_views
router = routers.DefaultRouter()
router.register(r'blog', BlogViewSet)
router.register(r'users', UserViewSet)
router.register(r'u', UserExtendViewSet)
router.register(r'follow', FollowViewSet)
router.register(r'like', LikeViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^',include(router.urls)),
    url(r'api-auth', include('rest_framework.urls',namespace='rest_framework'))
    
]

#user
urlpatterns +=[
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^logout/$', views.logout, name='logout'),
    url(r'^islogin/$', views.isLogin, name='islogin'),
    url(r'^register/$', views.register, name='register'),

]


#file upload
urlpatterns +=[
    url(r'^blog_image_upload/$', f_views.blog_image_upload, name='blog_image_upload'),

]