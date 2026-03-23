from rest_framework import serializers
from .models import SiteSettings, HomePage, AboutSection


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = [
            "id",
            "business_name",
            "tagline",
            "phone",
            "email",
            "address",
            "city",
            "state",
            "zip_code",
            "service_area",
            "hours",
            "facebook_url",
            "instagram_url",
            "google_business_url",
            "created_at",
            "updated_at",
        ]


class HomePageSerializer(serializers.ModelSerializer):
    hero_background_image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomePage
        fields = [
            "id",
            "hero_title",
            "hero_subtitle",
            "hero_cta_text",
            "hero_cta_link",
            "hero_background_image",
            "hero_background_image_url",
            "created_at",
            "updated_at",
        ]

    def get_hero_background_image_url(self, obj):
        request = self.context.get("request")
        if obj.hero_background_image:
            if request:
                return request.build_absolute_uri(obj.hero_background_image.url)
            return obj.hero_background_image.url
        return None


class AboutSectionSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = AboutSection
        fields = [
            "id",
            "heading",
            "subheading",
            "content",
            "image",
            "image_url",
            "display_order",
            "is_active",
            "created_at",
            "updated_at",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None