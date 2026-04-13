from django.http import Http404
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import HomePageHeroContent
from .serializers import *


class ActiveHomePageHeroContentView(generics.RetrieveAPIView):
    serializer_class = HomePageHeroContentSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        obj = HomePageHeroContent.objects.filter(is_active=True).first()
        if obj is None:
            raise Http404("No active homepage hero content found.")
        return obj
    

class AboutModuleListView(generics.ListAPIView):
    queryset = AboutModule.objects.all()
    serializer_class = AboutModuleSerializer