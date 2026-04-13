from rest_framework import serializers
from .models import ContactPageContent

class ContactPageContentSerializer(serializers.ModelSerializer):
    heroImageUrl = serializers.SerializerMethodField()

    class Meta:
        model = ContactPageContent
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