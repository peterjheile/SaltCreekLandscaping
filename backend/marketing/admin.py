from django.contrib import admin, messages
from .models import HeroCard, FeatureCard, ReviewCard, HeroContent
from django.db.models import Max
from django.utils.html import format_html


@admin.register(HeroCard)
class HeroCardAdmin(admin.ModelAdmin):
    list_display = ("title", "sort_order", "is_active")
    list_editable = ("sort_order", "is_active")
    ordering = ("sort_order",)


@admin.register(FeatureCard)
class FeatureCardAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "sort_order", "created_at")
    list_editable = ("is_active", "sort_order")
    ordering = ("sort_order", "id")
    search_fields = ("title",)

    fieldsets = (
        ("Content", {
            "fields": ("title", "description", "image"),
        }),
        ("Call To Action (Optional)", {
            "fields": ("cta_text", "cta_link"),
            "description": "Leave both fields blank to hide the button.",
        }),
        ("Display Settings", {
            "fields": ("is_active", "sort_order"),
            "description": "You can have at most 4 active feature cards.",
        }),
    )

    def changelist_view(self, request, extra_context=None):
        active_count = FeatureCard.objects.filter(is_active=True).count()

        if active_count < 4:
            self.message_user(
                request,
                f"You currently have {active_count}/4 active feature cards.",
                level=messages.WARNING,
            )
        elif active_count == 4:
            self.message_user(
                request,
                "You currently have 4/4 active feature cards.",
                level=messages.INFO,
            )

        return super().changelist_view(request, extra_context=extra_context)

    def save_model(self, request, obj, form, change):
        if obj.sort_order in (None, 0):
            max_order = FeatureCard.objects.exclude(pk=obj.pk).aggregate(
                max_order=Max("sort_order")
            )["max_order"]
            obj.sort_order = (max_order or 0) + 1

        super().save_model(request, obj, form, change)



@admin.register(ReviewCard)
class ReviewCardAdmin(admin.ModelAdmin):
    list_display = (
        "image_preview",
        "name",
        "tag",
        "short_review",
        "sort_order",
        "is_active",
        "created_at",
    )
    list_editable = ("sort_order", "is_active")
    list_filter = ("is_active", "created_at")
    search_fields = ("name", "tag", "review")
    ordering = ("sort_order", "id")
    readonly_fields = ("image_preview_large", "created_at")
    fields = (
        "name",
        "tag",
        "review",
        "image",
        "image_preview_large",
        "sort_order",
        "is_active",
        "created_at",
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 9999px;" />',
                obj.image.url,
            )
        return "—"

    image_preview.short_description = "Image"

    def image_preview_large(self, obj):
        if obj.pk and obj.image:
            return format_html(
                '<img src="{}" style="max-width: 120px; max-height: 120px; object-fit: cover; border-radius: 12px; border: 1px solid #ddd;" />',
                obj.image.url,
            )
        return "No image uploaded."

    image_preview_large.short_description = "Current image preview"

    def short_review(self, obj):
        if len(obj.review) <= 80:
            return obj.review
        return f"{obj.review[:80]}..."

    short_review.short_description = "Review"






@admin.register(HeroContent)
class HeroContentAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "created_at")
    list_editable = ("is_active",)
    list_filter = ("is_active", "created_at")
    search_fields = ("title", "subtitle")
    ordering = ("-is_active", "-created_at")
    readonly_fields = ("created_at",)
    fields = ("title", "subtitle", "is_active", "created_at")
