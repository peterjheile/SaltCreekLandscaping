# marketing/serializers.py

from rest_framework import serializers
from .models import HeroCard, FeatureCard, ReviewCard, HeroContent


class HeroCardSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HeroCard
        fields = [
            "id",
            "title",
            "description",
            "image_url",
            "sort_order",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
    



class FeatureCardSerializer(serializers.ModelSerializer):
    imageUrl = serializers.SerializerMethodField()
    ctaText = serializers.CharField(source="cta_text")
    ctaLink = serializers.CharField(source="cta_link")
    sortOrder = serializers.IntegerField(source="sort_order")

    class Meta:
        model = FeatureCard
        fields = (
            "id",
            "title",
            "description",
            "imageUrl",
            "ctaText",
            "ctaLink",
            "sortOrder",
        )

    def get_imageUrl(self, obj):
        request = self.context.get("request")

        if not obj.image:
            return ""

        url = obj.image.url
        return request.build_absolute_uri(url) if request else url
    


class ReviewCardSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ReviewCard
        fields = ("id", "name", "tag", "review", "image")

    def get_image(self, obj):
        if not obj.image:
            return None

        request = self.context.get("request")
        url = obj.image.url

        if request is not None:
            return request.build_absolute_uri(url)

        return url
    


class HeroContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroContent
        fields = ("id", "title", "subtitle")