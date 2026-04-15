from django.contrib import admin
from unfold.admin import ModelAdmin
from django.utils.html import format_html

from .models import GalleryPageContent, GalleryPhoto


@admin.register(GalleryPageContent)
class GalleryPageContentAdmin(ModelAdmin):
    list_display = (
        "name",
        "title",
        "is_active",
        "sort_order",
        "hero_image_preview",
        "updated_at",
    )
    list_filter = ("is_active", "created_at", "updated_at")
    search_fields = ("name", "slug", "title", "eyebrow", "subtitle")
    ordering = ("sort_order", "name")
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = ("hero_image_preview", "created_at", "updated_at")

    fieldsets = (
        (
            "Admin Info",
            {
                "fields": ("name", "slug", "is_active", "sort_order"),
            },
        ),
        (
            "FAQ Content",
            {
                "fields": (
                    "eyebrow",
                    "title",
                    "subtitle",
                    "hero_image",
                    "hero_image_preview",
                ),
            },
        ),
        (
            "Timestamps",
            {
                "fields": ("created_at", "updated_at"),
            },
        ),
    )

    def hero_image_preview(self, obj):
        if obj.hero_image:
            return format_html(
                '<img src="{}" style="max-height: 120px; border-radius: 8px;" />',
                obj.hero_image.url,
            )
        return "No image"
    
    hero_image_preview.short_description = "Hero Image Preview"










@admin.register(GalleryPhoto)
class GalleryPhotoAdmin(ModelAdmin):
    list_display = (
        "title",
        "show_on_homepage",
        "sort_order",
        "created_at",
    )
    list_editable = (
        "show_on_homepage",
        "sort_order",
    )
    list_filter = ("show_on_homepage", "created_at")
    search_fields = ("title", "description")
    ordering = ("sort_order", "-created_at")