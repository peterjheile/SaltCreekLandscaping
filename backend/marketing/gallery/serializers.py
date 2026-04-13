from rest_framework import serializers
from .models import GalleryPageContent, GalleryPhoto

class GalleryPageContentSerializer(serializers.ModelSerializer):
    heroImageUrl = serializers.SerializerMethodField()

    class Meta:
        model = GalleryPageContent
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
    


class GalleryPhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = GalleryPhoto
        fields = [
            "id",
            "title",
            "description",
            "image_url",
            "show_on_homepage",
            "sort_order",
            "created_at",
        ]

    def get_image_url(self, obj):
        if not obj.image:
            return None

        request = self.context.get("request")
        if request is not None:
            return request.build_absolute_uri(obj.image.url)

        return obj.image.url