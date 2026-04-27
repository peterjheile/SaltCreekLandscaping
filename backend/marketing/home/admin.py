from django.contrib import admin
from unfold.admin import ModelAdmin
from django.utils.html import format_html

from .models import HomePageHeroContent, AboutModule


@admin.register(HomePageHeroContent)
class HomePageHeroContentAdmin(ModelAdmin):
    list_display = (
        "name",
        "is_active",
        "sort_order",
        "title",
        "has_image",
        "has_video",
        "updated_at",
    )
    list_display_links = ("name", "title")
    list_editable = ("sort_order",)
    search_fields = ("name", "slug", "eyebrow", "title", "subtitle")
    list_filter = ("is_active",)
    ordering = ("sort_order", "name")
    readonly_fields = (
        "slug",
        "created_at",
        "updated_at",
        "image_preview",
        "video_preview",
    )

    fieldsets = (
        (
            "Versioning",
            {
                "fields": (
                    "name",
                    "slug",
                    "is_active",
                    "sort_order",
                )
            },
        ),
        (
            "Hero Content",
            {
                "fields": (
                    "eyebrow",
                    "title",
                    "subtitle",
                )
            },
        ),
        (
            "What You Can Expect",
            {
                "fields": (
                    "expect_item_1",
                    "expect_item_2",
                    "expect_item_3",
                ),
                "description": "These appear as the three expectation items in the homepage hero.",
            },
        ),
        (
            "Media",
            {
                "fields": (
                    "hero_image",
                    "image_preview",
                    "hero_video",
                    "video_preview",
                )
            },
        ),
        (
            "Timestamps",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )

    def has_image(self, obj):
        return bool(obj.hero_image)

    has_image.boolean = True
    has_image.short_description = "Image"

    def has_video(self, obj):
        return bool(obj.hero_video)

    has_video.boolean = True
    has_video.short_description = "Video"

    def image_preview(self, obj):
        if not obj.hero_image:
            return "No image uploaded."

        return format_html(
            '<img src="{}" style="max-width: 320px; width: 100%; border-radius: 12px;" />',
            obj.hero_image.url,
        )

    image_preview.short_description = "Image Preview"

    def video_preview(self, obj):
        if not obj.hero_video:
            return "No video uploaded."

        return format_html(
            '<video src="{}" style="max-width: 320px; width: 100%; border-radius: 12px;" controls preload="metadata"></video>',
            obj.hero_video.url,
        )

    video_preview.short_description = "Video Preview"








@admin.register(AboutModule)
class AboutModuleAdmin(ModelAdmin):
    list_display = (
        "title",
        "sort_order",
        "cta_text",
        "cta_link",
        "updated_at",
    )
    list_editable = ("sort_order",)
    search_fields = ("title", "description", "cta_text", "cta_link")
    ordering = ("sort_order", "id")
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        (
            "Content",
            {
                "fields": (
                    "title",
                    "description",
                ),
                "description": "Main text content for this section of the homepage About area.",
            },
        ),
        (
            "Image",
            {
                "fields": (
                    "image",
                    "image_alt",
                ),
                "description": "Upload an image and provide alt text for accessibility and SEO.",
            },
        ),
        (
            "Call to Action",
            {
                "fields": (
                    "cta_text",
                    "cta_link",
                ),
                "description": "Optional button. Add text and a link if you want users to take action (e.g., book a service).",
            },
        ),
        (
            "Ordering",
            {
                "fields": ("sort_order",),
                "description": "Controls the order this module appears on the page. Lower numbers appear first.",
            },
        ),
        (
            "Timestamps",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                ),
                "description": "Automatically managed timestamps for when this module was created and last updated.",
            },
        ),
    )