from django import http
from django.views.decorators.csrf import csrf_exempt

from file.models import BlogImage
from users.models import UserExtend


@csrf_exempt
def blog_image_upload(request):
    if request.method == "POST":
        img = BlogImage.objects.create(user=request.user, path=request.FILES['files[]'])
        return http.HttpResponse(img.path.name)
    else:
        return http.JsonResponse('')


@csrf_exempt
def head_image_upload(request):
    if request.method == "POST":
        img = UserExtend.objects.create(user=request.user, head_image=request.FILES['files[]'])
        return http.HttpResponse(img.path.name)
    else:
        return http.JsonResponse('')


@csrf_exempt
def background_image_upload(request):
    if request.method == "POST":
        img = UserExtend.objects.create(user=request.user, background_image=request.FILES['files[]'])
        return http.HttpResponse(img.path.name)
    else:
        return http.JsonResponse('')