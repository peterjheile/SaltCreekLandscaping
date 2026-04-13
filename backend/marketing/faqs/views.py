from rest_framework.permissions import AllowAny
from rest_framework import generics
from django.db.models import Prefetch
from django.http import Http404

from .models import FAQ, FAQCategory, FAQPageContent
from .serializers import FAQCategorySerializer, FAQPageContentSerializer




class ActiveFAQPageContentView(generics.RetrieveAPIView):
    serializer_class = FAQPageContentSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        obj = FAQPageContent.objects.filter(is_active=True).first()
        if obj is None:
            raise Http404("No active FAQ page content found.")
        return obj




class FAQCategoryListView(generics.ListAPIView):
    serializer_class = FAQCategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        active_faqs = FAQ.objects.filter(is_active=True).order_by("sort_order", "id")

        return (
            FAQCategory.objects.filter(is_active=True)
            .order_by("sort_order", "id")
            .prefetch_related(Prefetch("faqs", queryset=active_faqs))
        )