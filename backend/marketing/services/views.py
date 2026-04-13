from rest_framework.permissions import AllowAny
from rest_framework import generics
from django.http import Http404
from django.db.models import Prefetch

from .serializers import ServicePageContentSerializer, ServiceCategorySerializer
from .models import ServicePageContent, ServiceCategory, ServiceCategoryIncludedItem


class ActiveServicePageContentView(generics.RetrieveAPIView):
    serializer_class = ServicePageContentSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        obj = ServicePageContent.objects.filter(is_active=True).first()
        if obj is None:
            raise Http404("No active Service page content found.")
        return obj
    


class ServiceCategoryListView(generics.ListAPIView):
    serializer_class = ServiceCategorySerializer

    def get_queryset(self):
        included_items_qs = ServiceCategoryIncludedItem.objects.select_related(
            "included_item"
        ).order_by("sort_order", "included_item__name")

        return (
            ServiceCategory.objects.filter(is_published=True)
            .order_by("sort_order", "title")
            .prefetch_related(
                Prefetch(
                    "service_category_included_items",
                    queryset=included_items_qs,
                )
            )
        )