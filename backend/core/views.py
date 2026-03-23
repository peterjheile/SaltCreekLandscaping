from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SiteSettings, HomePage, AboutSection
from .serializers import (
    SiteSettingsSerializer,
    HomePageSerializer,
    AboutSectionSerializer,
)


class SiteSettingsDetailView(APIView):
    def get(self, request, *args, **kwargs):
        site_settings = SiteSettings.objects.first()
        if not site_settings:
            return Response({}, status=200)

        serializer = SiteSettingsSerializer(site_settings, context={"request": request})
        return Response(serializer.data)


class HomePageDetailView(APIView):
    def get(self, request, *args, **kwargs):
        homepage = HomePage.objects.first()
        if not homepage:
            return Response({}, status=200)

        serializer = HomePageSerializer(homepage, context={"request": request})
        return Response(serializer.data)


class AboutSectionListView(generics.ListAPIView):
    serializer_class = AboutSectionSerializer

    def get_queryset(self):
        return AboutSection.objects.filter(is_active=True).order_by("display_order", "id")