from rest_framework import serializers

from .models import HomePageHeroContent, AboutModule


class HomePageHeroContentSerializer(serializers.ModelSerializer):
    video_url = serializers.SerializerMethodField()
    expect_items = serializers.SerializerMethodField()

    class Meta:
        model = HomePageHeroContent
        fields = [
            "id",
            "name",
            "slug",
            "eyebrow",
            "title",
            "subtitle",
            "expect_items",
            "video_url",
            "is_active",
            "sort_order",
            "created_at",
            "updated_at",
        ]

    def get_video_url(self, obj):
        if not obj.hero_video:
            return None

        request = self.context.get("request")
        url = obj.hero_video.url

        if request is not None:
            return request.build_absolute_uri(url)

        return url

    def get_expect_items(self, obj):
        return [
            item
            for item in [
                obj.expect_item_1,
                obj.expect_item_2,
                obj.expect_item_3,
            ]
            if item
        ]
    


class AboutModuleSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    imageAlt = serializers.CharField(source="image_alt")
    ctaText = serializers.CharField(source="cta_text")
    ctaLink = serializers.CharField(source="cta_link")

    class Meta:
        model = AboutModule
        fields = (
            "title",
            "description",
            "image",
            "imageAlt",
            "ctaText",
            "ctaLink",
        )

    def get_image(self, obj):
        request = self.context.get("request")

        if not obj.image:
            return None

        if request is not None:
            return request.build_absolute_uri(obj.image.url)

        return obj.image.url