from rest_framework.permissions import AllowAny
from rest_framework import generics
from django.http import Http404

from .serializers import GalleryPageContentSerializer, GalleryPhotoSerializer
from .models import GalleryPageContent, GalleryPhoto


class ActiveGalleryPageContentView(generics.RetrieveAPIView):
    serializer_class = GalleryPageContentSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        obj = GalleryPageContent.objects.filter(is_active=True).first()
        if obj is None:
            raise Http404("No active Gallery page content found.")
        return obj
    


class GalleryPhotoListView(generics.ListAPIView):
    serializer_class = GalleryPhotoSerializer

    def get_queryset(self):
        return GalleryPhoto.objects.all().order_by("-created_at")


class HomepageGalleryPhotoListView(generics.ListAPIView):
    serializer_class = GalleryPhotoSerializer

    def get_queryset(self):
        return GalleryPhoto.objects.filter(show_on_homepage=True).order_by("sort_order", "-created_at")