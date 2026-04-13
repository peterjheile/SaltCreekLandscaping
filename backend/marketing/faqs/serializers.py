from rest_framework import serializers
from .models import FAQPageContent, FAQCategory, FAQ

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = (
            "id",
            "question",
            "answer",
        )


class FAQCategorySerializer(serializers.ModelSerializer):
    faqs = serializers.SerializerMethodField()

    class Meta:
        model = FAQCategory
        fields = (
            "id",
            "name",
            "slug",
            "faqs",
        )

    def get_faqs(self, obj):
        faqs = obj.faqs.filter(is_active=True).order_by("sort_order", "id")
        return FAQSerializer(faqs, many=True).data
    


class FAQPageContentSerializer(serializers.ModelSerializer):
    heroImageUrl = serializers.SerializerMethodField()

    class Meta:
        model = FAQPageContent
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