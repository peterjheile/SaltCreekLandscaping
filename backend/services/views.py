from django.db.models import Prefetch
from rest_framework import generics

from .models import ServiceCategory, ServiceCategoryIncludedItem
from .serializers import ServiceCategorySerializer


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

