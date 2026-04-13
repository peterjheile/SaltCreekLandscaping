from rest_framework import serializers
from .models import ServicePageContent, ServiceCategory, ServiceCategoryIncludedItem

class ServicePageContentSerializer(serializers.ModelSerializer):
    heroImageUrl = serializers.SerializerMethodField()

    class Meta:
        model = ServicePageContent
        fields = [
            "id",
            "name",
            "slug",
            "eyebrow",
            "title",
            "subtitle",
            "heroImageUrl",
            "is_active",
            "sort_order",
            "created_at",
            "updated_at",
        ]

    def get_heroImageUrl(self, obj):
        if not obj.hero_image:
            return None

        request = self.context.get("request")
        if request is not None:
            return request.build_absolute_uri(obj.hero_image.url)

        return obj.hero_image.url
    



class ServiceCategoryIncludedItemSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(source="included_item.id", read_only=True)
    name = serializers.CharField(source="included_item.name", read_only=True)
    sort_order = serializers.IntegerField(read_only=True)

    class Meta:
        model = ServiceCategoryIncludedItem
        fields = ("id", "name", "sort_order")


class ServiceCategorySerializer(serializers.ModelSerializer):
    included_items = serializers.SerializerMethodField()

    class Meta:
        model = ServiceCategory
        fields = (
            "id",
            "title",
            "eyebrow",
            "slug",
            "short_description",
            "long_description",
            "icon_name",
            "sort_order",
            "is_published",
            "included_items",
        )

    def get_included_items(self, obj):
        through_items = obj.service_category_included_items.select_related(
            "included_item"
        ).order_by("sort_order", "included_item__name")

        return ServiceCategoryIncludedItemSerializer(through_items, many=True).data