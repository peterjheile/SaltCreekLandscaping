from rest_framework import serializers
from .models import SiteSettings, BusinessHour


class BusinessHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessHour
        fields = (
            "id",
            "label",
            "open_time",
            "close_time",
            "is_closed",
            "sort_order",
        )


class SiteSettingsSerializer(serializers.ModelSerializer):
    business_hours = BusinessHourSerializer(many=True, read_only=True)
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        fields = (
            "business_name",
            "tagline",
            "logo_url",
            "phone",
            "email",
            "address",
            "city",
            "state",
            "zip_code",
            "service_area",
            "facebook_url",
            "instagram_url",
            "google_business_url",
            "primary_color",
            "secondary_color",
            "highlight_color",
            "text_color",
            "text_inverse_color",
            "business_hours",
        )

    def get_logo_url(self, obj):
        request = self.context.get("request")
        if obj.logo:
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return None