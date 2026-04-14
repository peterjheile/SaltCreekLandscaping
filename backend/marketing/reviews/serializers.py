from rest_framework import serializers

from .models import ReviewCard, ReviewsPageContent


class ReviewsPageContentSerializer(serializers.ModelSerializer):
    heroImageUrl = serializers.SerializerMethodField()

    class Meta:
        model = ReviewsPageContent
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







class ReviewCardSerializer(serializers.ModelSerializer):
    profileImageUrl = serializers.SerializerMethodField()
    showOnHomepage = serializers.BooleanField(source="show_on_homepage")
    reviewDate = serializers.DateField(source="review_date", allow_null=True)

    class Meta:
        model = ReviewCard
        fields = (
            "id",
            "name",
            "review",
            "profileImageUrl",
            "rating",
            "showOnHomepage",
            "reviewDate",
        )

    def get_profileImageUrl(self, obj):
        request = self.context.get("request")

        if not obj.profile_image:
            return None

        if request is not None:
            return request.build_absolute_uri(obj.profile_image.url)

        return obj.profile_image.url