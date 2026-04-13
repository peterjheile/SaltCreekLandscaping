from django.contrib import admin
from django.utils.html import format_html

from .models import FAQPageContent, FAQCategory, FAQ


@admin.register(FAQPageContent)
class FAQPageContentAdmin(admin.ModelAdmin):
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






@admin.register(FAQCategory)
class FAQCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "slug",
        "sort_order",
        "is_active",
    )
    list_display_links = ("name",)
    list_editable = ("sort_order", "is_active")
    search_fields = ("name", "slug")
    ordering = ("sort_order", "id")
    prepopulated_fields = {"slug": ("name",)}




@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = (
        "question",
        "category",
        "sort_order",
        "is_active",
    )
    list_display_links = ("question",)
    list_editable = ("sort_order", "is_active")
    list_filter = ("category", "is_active")
    search_fields = ("question", "answer", "category__name")
    ordering = ("category__sort_order", "sort_order", "id")
    autocomplete_fields = ("category",)
    fields = (
        "category",
        "question",
        "answer",
        "sort_order",
        "is_active",
    )